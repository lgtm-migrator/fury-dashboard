export interface FuryDashboardParams {
	apiurl: string
	supportserviceid: string
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


export type Language = 'IT' | 'EN'

export interface FuryState {
	modules: RemoteComponents,

	language: Language

	dashboard: boolean
}

declare global {
	interface Window {
		[key: string]: any

		FURY: FuryState
	}
}

