import { Module, RemoteScript } from './types';

export abstract class ModuleLoader
{
	protected constructor(protected componentConfig: RemoteScript)
	{
	}

	/**
	 * successHandler is invoked when the script is successfully loaded
	 * @protected
	 */
	protected async successHandler()
	{
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

		return Module;
	};

	/**
	 * errorHandler is invoked when the script loading fails.
	 * @protected
	 */
	protected errorHandler(event: Event | string): Promise<Module>
	{
		// todo return a default error component
		return null;
	}

	private loadScriptAsync(): Promise<Module>
	{
		return new Promise((resolve, reject) =>
		{
			if (!this.componentConfig.url)
			{
				return;
			}

			const element = document.createElement('script');

			element.src = this.componentConfig.url;
			element.type = 'text/javascript';
			element.async = this.componentConfig.async;

			element.onload = () =>
			{
				console.log(`Dynamic Script Loaded: ${ this.componentConfig.url }`);
				// modificare il dom a seguito del success
				resolve(this.successHandler());

			};

			element.onerror = (event) =>
			{
				console.error(`Dynamic Script Error: ${ this.componentConfig.url }`);
				// modificare il dom a seguito dell'errore
				reject(this.errorHandler(event));
			};

			document.head.appendChild(element);
		});

	};


	public async loadElementConstructorAsync(): Promise<CustomElementConstructor>
	{
		return (await this.loadScriptAsync()).default;
	}
}
