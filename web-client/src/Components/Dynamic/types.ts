export interface RemoteScript
{
	url: string;

	module: string;

	scope: string;

	/**
	 * if the script should be loaded async
	 */
	async: boolean
}

export interface Module
{
	default: CustomElementConstructor;
}

