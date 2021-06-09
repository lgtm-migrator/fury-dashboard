import { ModuleLoader } from '../Dynamic/ModuleLoader';
import { FuryDashboardParams, RemoteFederatedModule } from '../../Services/ConfigurationLoader/types';
import { DashboardConfig } from '../../Services/ConfigurationLoader/DashboardConfig';
import { NoModuleConfigurationError } from '../../Errors/NoModuleConfigurationError';


export class Module extends ModuleLoader<FuryDashboardParams> {

	constructor() {
		super(ModuleLoader.moduleNames.furyconnectswitchui);
	}

}
