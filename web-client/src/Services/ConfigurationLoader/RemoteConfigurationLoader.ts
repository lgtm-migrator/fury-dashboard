import {Configuration, ConfigurationLoader} from "./types";
import {DashboardConfig} from "./DashboardConfig";


export class RemoteConfigurationLoader implements ConfigurationLoader {
  
  private config: DashboardConfig = new DashboardConfig();
  
  private getBaseUrl(): string {
    return this.config.DASHBOARD_ENDPOINT ?? '';
  }
  
  private async fetchConfiguration() {
    const res = await fetch(this.getBaseUrl() + "/config/test");
  }
  
  loadConfigurationAsync(): Configuration {
    return undefined;
  }
}
