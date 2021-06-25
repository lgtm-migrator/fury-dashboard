/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { RemoteFederatedModule } from '../../Services/ConfigurationLoader/types';
import { DashboardConfig } from '../../Services/ConfigurationLoader/DashboardConfig';
import { NoModuleConfigurationError } from '../../Errors/NoModuleConfigurationError';
import ErrorDefaultWebComp from '../Errors/Default';
import { FuryStorage } from '../../Services/FuryStorage';
import { Logger } from '../../Services/Logging/Logger';

export abstract class ModuleLoader<T> {

	protected componentConfig: RemoteFederatedModule<T>;

	protected constructor(protected moduleKey: string, protected readonly conf: DashboardConfig) {

		if (!this.conf.REMOTE_COMPONENTS[this.moduleKey]) {
			throw new NoModuleConfigurationError(this.moduleKey, this.conf);
		}

		this.componentConfig = this.getConfig(this.conf);
	}

	protected getConfig(conf: DashboardConfig): RemoteFederatedModule<T> {
		return conf.REMOTE_COMPONENTS[this.moduleKey];
	};

	/**
	 * successHandler is invoked when the script is successfully loaded
	 * @protected
	 */
	protected async successHandler() {
		// Initializes the share scope. This fills it with known provided modules from this build and all remotes
		// @ts-ignore
		await __webpack_init_sharing__('default');
		const container = window[this.componentConfig.scope]; // or get the container somewhere else
		// Initialize the container, it may provide shared modules
		// @ts-ignore
		await container.init(__webpack_share_scopes__.default);
		// @ts-ignore
		const factory = await window[this.componentConfig.scope].get(this.componentConfig.module);
		const Module = factory();

		FuryStorage.singleton.setModuleValue(this.moduleKey, this.componentConfig.params, this.componentConfig.mocked);

		return Module.default;
	};

	/**
	 * ErrorHandler is invoked when the script loading fails.
	 * @protected
	 */
	protected async errorHandler(event: Event | string): Promise<CustomElementConstructor> {

		return ErrorDefaultWebComp;
	}

	private loadScriptAsync(): Promise<CustomElementConstructor> {
		return new Promise((resolve, reject) => {
			const element = document.createElement('script');
			Logger.singleton.log('this', this)

			element.src = this.componentConfig.url;
			element.type = 'text/javascript';
			element.async = true;

			element.onload = () => {
				Logger.singleton.log(`Dynamic Script Loaded: ${ this.componentConfig.url }`);
				// Upadtes the DOM after a positive load
				resolve(this.successHandler());
			};

			element.onerror = (event) => {
				Logger.singleton.error(`Dynamic Script Error: ${ this.componentConfig.url }`);
				// Updates the DOM after a loading error
				resolve(this.errorHandler(event));
			};

			document.head.appendChild(element);
		});
	};


	public async loadElementConstructorAsync(): Promise<CustomElementConstructor> {
		return (await this.loadScriptAsync());
	}
}
