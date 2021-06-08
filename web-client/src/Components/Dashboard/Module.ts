import { ModuleLoader } from '../Dynamic/ModuleLoader';
import { FuryDashboardParams, RemoteFederatedModule } from '../../Services/ConfigurationLoader/types';


export class Module extends ModuleLoader<FuryDashboardParams>
{

	constructor()
	{
		super(Module.getFuryDashboardRemoteModuleData());
	}


	private static getFuryDashboardRemoteModuleData(): RemoteFederatedModule<FuryDashboardParams>
	{
		{
			const remoteFuryConnectSwitchUIConfig = window.DASHBOARD_CONFIG
				? window.DASHBOARD_CONFIG.REMOTE_COMPONENTS.furyconnectswitchui
				: JSON.parse(process.env.DASHBOARD_CONFIG).REMOTE_COMPONENTS
					.furyconnectswitchui;


			window.APP_CONFIG = {
				APP_ENDPOINT: remoteFuryConnectSwitchUIConfig.Params.apiurl,
			};

			return {
				url   : remoteFuryConnectSwitchUIConfig.Url,
				scope : remoteFuryConnectSwitchUIConfig.Scope,
				module: remoteFuryConnectSwitchUIConfig.Module,
				params: {
					apiUrl: remoteFuryConnectSwitchUIConfig.Params.apiurl,
				},
			};
		}
	}

}
