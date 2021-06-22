/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { RemoteComponents } from './types';
import {Logger} from "../Logging/Logger";

type ConstructorParams = {
	DASHBOARD_ENDPOINT: any;
	remoteComponents: any;
};

export class DashboardConfig {
	public readonly DASHBOARD_ENDPOINT?: string;

	public readonly REMOTE_COMPONENTS: RemoteComponents;

	public static singleton: DashboardConfig;

	private constructor(conf: ConstructorParams)
	{
		if (!conf.remoteComponents) {
			throw new Error('missing dashboard config data');
		}

		this.DASHBOARD_ENDPOINT = conf.DASHBOARD_ENDPOINT;
		this.REMOTE_COMPONENTS = conf.remoteComponents;
	}

	private static fromEnvOrWindow(): DashboardConfig {
		const dashboardconfig = process.env.DASHBOARD_CONFIG;

		if (!dashboardconfig) {
			throw Error('no DASHBOARD_CONFIG found');
		}
		Logger.singleton.log(dashboardconfig);
		const parsedConfig = JSON.parse(dashboardconfig);
		Logger.singleton.log(parsedConfig)
		if (
			!parsedConfig.DASHBOARD_ENDPOINT ||
			!parsedConfig.remoteComponents
		)
		{
			throw Error('missing configuration components');
		}

		return new DashboardConfig(parsedConfig);
	}

	private static async fromRemote(
		basePath: string = '',
	): Promise<DashboardConfig> {
		const res = await fetch(`${ basePath }/config`);
		const data = await res.json();

		return new DashboardConfig(data.Data);
	}

	public static createFromJson(jsonConfig: ConstructorParams): DashboardConfig {
		DashboardConfig.singleton = new DashboardConfig(jsonConfig);
		return DashboardConfig.singleton;
	}

	public static async createSingletonAsync(): Promise<DashboardConfig> {
		// Take the config from different places based
		// on the enviroment
		Logger.singleton.log(process.env)
		if (process.env.SERVER_OFFLINE === 'true') {
			DashboardConfig.singleton =
				DashboardConfig.fromEnvOrWindow();
		} else {
			DashboardConfig.singleton =
				await DashboardConfig.fromRemote(process.env.SERVER_BASE_PATH ?? '');
		}

		return DashboardConfig.singleton;
	}


}
