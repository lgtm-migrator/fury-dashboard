export interface RemoteScript
{
	readonly url: string;

	readonly module: string;

	readonly scope: string;

	/**
	 * if the script should be loaded async
	 */
	 readonly async: boolean
}

export interface Module
{
	readonly default: CustomElementConstructor;
}

