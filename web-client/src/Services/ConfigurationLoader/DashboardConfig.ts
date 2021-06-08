import {RemoteComponents} from "./types";


export class DashboardConfig {
  
  public readonly DASHBOARD_ENDPOINT: string
  public readonly REMOTE_COMPONENTS: RemoteComponents
  
  constructor() {
    const env = window.DASHBOARD_CONFIG ?? process.env.DASHBOARD_CONFIG;
    
    if (!env) {
      throw Error("no DASHBOARD_CONFIG found")
    }
    
    const dashboardConfig = JSON.parse(process.env.DASHBOARD_CONFIG);
    
    if (!dashboardConfig.DASHBOARD_ENDPOINT || !dashboardConfig.REMOTE_COMPONENTS) {
      throw Error("missing configuration components")
    }
    
    this.DASHBOARD_ENDPOINT = dashboardConfig.DASHBOARD_ENDPOINT;
    
    this.REMOTE_COMPONENTS = dashboardConfig.REMOTE_COMPONENTS;
  }
  
}
