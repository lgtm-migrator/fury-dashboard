import {ModuleLoader} from '../Dynamic/ModuleLoader';
import {FuryDashboardParams, RemoteFederatedModule} from '../../Services/ConfigurationLoader/types';
import {DashboardConfig} from "../../Services/ConfigurationLoader/DashboardConfig";
import {NoModuleConfigurationError} from "../../Errors/NoModuleConfigurationError";


export class Module extends ModuleLoader<FuryDashboardParams> {
  
  
  protected getConfig(conf: DashboardConfig): RemoteFederatedModule<FuryDashboardParams> {
    {
      
      if (!this.conf.REMOTE_COMPONENTS.furyconnectswitchui) {
        throw new NoModuleConfigurationError("fury-dashboard", conf)
      }
      
      const remoteFuryConnectSwitchUIConfig = this.conf.REMOTE_COMPONENTS.furyconnectswitchui
      
      
      window.APP_CONFIG = {
        APP_ENDPOINT: remoteFuryConnectSwitchUIConfig.Params.apiurl,
      };
      
      return {
        Url: remoteFuryConnectSwitchUIConfig.Url,
        Scope: remoteFuryConnectSwitchUIConfig.Scope,
        Module: remoteFuryConnectSwitchUIConfig.Module,
        Params: {
          apiurl: remoteFuryConnectSwitchUIConfig.Params.apiurl,
        },
      };
    }
  }
  
}
