/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { ModuleLoader } from '../Dynamic/ModuleLoader';
import { FuryDashboardParams } from '../../Services/Configuration/types';
import { DashboardConfig } from '../../Services/Configuration/DashboardConfig';
import { FuryModule } from '../../Services/Configuration/FuryModule';


export class Module extends ModuleLoader<FuryDashboardParams> {

	constructor(dashboardConfig = DashboardConfig.singleton) {
		super(FuryModule.support, dashboardConfig);
	}

}
