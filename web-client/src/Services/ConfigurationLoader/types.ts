export interface FuryDashboardParams
{
	apiUrl: string
}

export interface RemoteFederatedModule<T extends {}>
{
	readonly scope: string

	readonly module: string

	readonly url: string

	readonly params: T
}

interface RemoteComponents
{
	furyconnectswitchui?: RemoteFederatedModule<FuryDashboardParams>
}

export interface Configuration
{
	listener: string

	externalEndpoint: string

	remoteComponents: RemoteComponents

}


export interface ConfigurationLoader
{
	loadConfigurationAsync(): Configuration
}
