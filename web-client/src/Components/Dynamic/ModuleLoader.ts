import { RemoteFederatedModule } from '../../Services/ConfigurationLoader/types';
import { DashboardConfig } from '../../Services/ConfigurationLoader/DashboardConfig';
import { NoModuleConfigurationError } from '../../Errors/NoModuleConfigurationError';
import ErrorDefaultWebComp from '../Errors/Default';
import { FuryStorage } from '../../Services/FuryStorage';

export abstract class ModuleLoader<T> {

	protected readonly conf: DashboardConfig = DashboardConfig.singleton;

	protected componentConfig: RemoteFederatedModule<T>;

	protected constructor(protected moduleKey: string) {

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
		const container = window[this.componentConfig.Scope]; // or get the container somewhere else
		// Initialize the container, it may provide shared modules
		// @ts-ignore
		await container.init(__webpack_share_scopes__.default);
		// @ts-ignore
		const factory = await window[this.componentConfig.Scope].get(this.componentConfig.Module);
		const Module = factory();

		FuryStorage.singleton.setModuleValue(this.moduleKey, this.componentConfig.Params);

		return Module.default;
	};

	/**
	 * errorHandler is invoked when the script loading fails.
	 * @protected
	 */
	protected async errorHandler(event: Event | string): Promise<CustomElementConstructor> {
		// todo return a default error component
		return ErrorDefaultWebComp;
	}

	private loadScriptAsync(): Promise<CustomElementConstructor> {
		return new Promise((resolve, reject) => {
			const element = document.createElement('script');
			console.log('this', this)

			element.src = this.componentConfig.Url;
			element.type = 'text/javascript';
			element.async = true;

			element.onload = () => {
				console.log(`Dynamic Script Loaded: ${ this.componentConfig.Url }`);
				// modificare il dom a seguito del success
				resolve(this.successHandler());
			};

			element.onerror = (event) => {
				console.error(`Dynamic Script Error: ${ this.componentConfig.Url }`);
				// modificare il dom a seguito dell'errore
				resolve(this.errorHandler(event));
			};

			document.head.appendChild(element);
		});

	};


	public async loadElementConstructorAsync(): Promise<CustomElementConstructor> {
		return (await this.loadScriptAsync());
	}
}
