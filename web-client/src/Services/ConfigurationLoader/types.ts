/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

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
