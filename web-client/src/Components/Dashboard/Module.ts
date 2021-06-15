/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { ModuleLoader } from '../Dynamic/ModuleLoader';
import { FuryDashboardParams, RemoteFederatedModule } from '../../Services/ConfigurationLoader/types';
import { DashboardConfig } from '../../Services/ConfigurationLoader/DashboardConfig';
import { NoModuleConfigurationError } from '../../Errors/NoModuleConfigurationError';


export class Module extends ModuleLoader<FuryDashboardParams> {

	constructor() {
		super(ModuleLoader.moduleNames.furyconnectswitchui);
	}

	protected getConfig(conf: DashboardConfig): RemoteFederatedModule<FuryDashboardParams> {
		{
			if (!this.conf.REMOTE_COMPONENTS.furyconnectswitchui) {
				throw new NoModuleConfigurationError('furyconnectswitchui', conf);
			}

			window.APP_CONFIG = {
				APP_ENDPOINT: this.conf.REMOTE_COMPONENTS.furyconnectswitchui.Params.apiurl,
			};

			return super.getConfig(conf);
		}
	}

}
