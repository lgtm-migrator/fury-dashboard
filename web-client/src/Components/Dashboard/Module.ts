import {ModuleLoader} from '../Dynamic/ModuleLoader';
import {FuryDashboardParams, RemoteFederatedModule} from '../../Services/ConfigurationLoader/types';
import {DashboardConfig} from "../../Services/ConfigurationLoader/DashboardConfig";
import {NoModuleConfigurationError} from "../../Errors/NoModuleConfigurationError";


export class Module extends ModuleLoader<FuryDashboardParams> {
  
  constructor() {
    super(ModuleLoader.moduleNames.furyconnectswitchui);
  }
  
  protected getConfig(conf: DashboardConfig): RemoteFederatedModule<FuryDashboardParams> {
    {
      console.log(conf, "dashboardconf")
      
      window.APP_CONFIG = {
        APP_ENDPOINT: this.conf.REMOTE_COMPONENTS.furyconnectswitchui.Params.apiurl,
      };
      
      return super.getConfig(conf);
    }
  }
  
}
