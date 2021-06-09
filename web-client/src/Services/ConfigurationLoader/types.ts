export interface FuryDashboardParams {
	apiurl: string
}

export interface ClusterMapParams {
	apiurl: string

	clientName: string
}

export interface RemoteFederatedModule<T extends {}> {
	readonly Scope: string

	readonly Module: string

	readonly Url: string

	readonly Params: T
}

export interface RemoteComponents {
	[key: string]: any

	furyconnectswitchui?: RemoteFederatedModule<FuryDashboardParams>
}

export interface Configuration {
	listener: string

	externalEndpoint: string

	remoteComponents: RemoteComponents

}

export interface ConfigurationLoader {
	loadConfigurationAsync(): Promise<Configuration>
}

export type Language = 'IT' | 'EN'

export interface SighupState {
	modules: RemoteComponents,

	language: Language
}

declare global {
	interface Window {
		[key: string]: any

		DASHBOARD_CONFIG?: {
			REMOTE_COMPONENTS: {
				[key: string]: {
					Scope: string;
					Module: string;
					Url: string;
					Params?: {
						[key: string]: any;
					};
				};
			};
		};

		SIGHUP: SighupState
	}
}

