interface RemoteScript
{
	url: string;

	module: string;

	scope: string;
}


export abstract class ModuleLoader
{
	constructor(protected componentConfig: RemoteScript)
	{
	}

	private async successHandler()
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
		// console.log('module', Module)
		return {
			error : null,
			module: Module,
		};
	};


	protected abstract implementation(): any;

	// si può fare override
	protected errorModule(): any
	{
		// ritorna modulo d'errore
	}

	public loader()
	{
		try
		{
			return this.implementation().default;
		} catch (e)
		{
			return this.errorModule().default;
		}

	}
}
