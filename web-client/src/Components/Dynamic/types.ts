export interface RemoteScript
{
	url: string;

	module: string;

	scope: string;

	async: boolean
}

export interface Module
{
	default: CustomElementConstructor;
}
