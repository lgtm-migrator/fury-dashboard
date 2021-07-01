/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { ModuleLoader } from '../Dynamic/ModuleLoader';
import { FuryDashboardParams } from '../../Services/ConfigurationLoader/types';
import { DashboardConfig } from '../../Services/ConfigurationLoader/DashboardConfig';
import { ModuleConstants } from '../../Services/ConfigurationLoader/ModuleAssociation';


export class Module extends ModuleLoader<FuryDashboardParams> {

	constructor(dashboardConfig = DashboardConfig.singleton) {
		super(ModuleConstants.names.furyconnectswitchui, dashboardConfig);
	}

}
