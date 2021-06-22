/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

export interface FuryDashboardParams {
	apiurl: string
	supportserviceid: string
}

export interface ClusterMapParams {
	apiurl: string

	clientName: string
}

export interface RemoteFederatedModule<T extends {}> {
	readonly scope: string

	readonly module: string

	readonly url: string

	readonly params: T
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

