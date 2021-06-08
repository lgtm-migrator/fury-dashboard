import {FederatedModule} from './types';
import {RemoteFederatedModule} from '../../Services/ConfigurationLoader/types';
import {DashboardConfig} from "../../Services/ConfigurationLoader/DashboardConfig";
import {NoModuleConfigurationError} from "../../Errors/NoModuleConfigurationError";

export abstract class ModuleLoader<T> {
  
  protected static readonly moduleNames = {
    furyconnectswitchui: "furyconnectswitchui",
    furyclustermap: "furyclustermap"
  }
  
  protected readonly conf: DashboardConfig = new DashboardConfig();
  protected componentConfig: RemoteFederatedModule<T>
  
  protected constructor(protected moduleKey: string) {
    
    if (!this.conf.REMOTE_COMPONENTS[this.moduleKey]) {
      throw new NoModuleConfigurationError(this.moduleKey, this.conf)
    }
    
    
    this.componentConfig = this.getConfig(this.conf)
  }
  
  protected getConfig(conf: DashboardConfig): RemoteFederatedModule<T> {
    return conf[this.moduleKey]
  };
  
  /**
   * successHandler is invoked when the script is successfully loaded
   * @protected
   */
  protected async successHandler() {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // @ts-ignore
    await __webpack_init_sharing__('default');
    const container = window[this.componentConfig.Scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await window[this.componentConfig.Scope].get(this.componentConfig.Module);
    const Module = factory();
    
    return Module;
  };
  
  /**
   * errorHandler is invoked when the script loading fails.
   * @protected
   */
  protected errorHandler(event: Event | string): Promise<FederatedModule> {
    // todo return a default error component
    return null;
  }
  
  private loadScriptAsync(): Promise<FederatedModule> {
    return new Promise((resolve, reject) => {
      const element = document.createElement('script');
      
      element.src = this.componentConfig.Url;
      element.type = 'text/javascript';
      element.async = true;
      
      element.onload = () => {
        console.log(`Dynamic Script Loaded: ${this.componentConfig.Url}`);
        // modificare il dom a seguito del success
        resolve(this.successHandler());
        
      };
      
      element.onerror = (event) => {
        console.error(`Dynamic Script Error: ${this.componentConfig.Url}`);
        // modificare il dom a seguito dell'errore
        reject(this.errorHandler(event));
      };
      
      document.head.appendChild(element);
    });
    
  };
  
  
  public async loadElementConstructorAsync(): Promise<CustomElementConstructor> {
    return (await this.loadScriptAsync()).default;
  }
}
