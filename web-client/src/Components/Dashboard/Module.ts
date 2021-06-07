import { ModuleLoader } from '../Dynamic/ModuleLoader';
import { RemoteScript } from '../Dynamic/types';


export class Module extends ModuleLoader
{

	constructor()
	{
		super(Module.getFuryDashboardRemoteModuleData());
	}


	private static getFuryDashboardRemoteModuleData(): RemoteScript
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
				async : true,
			};
		}
	}

}
