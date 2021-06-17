import {DashboardConfig} from "../../src/Services/ConfigurationLoader/DashboardConfig";
import {Module as DashboardModule} from "../../src/Components/Dashboard/Module";

test("DashboardConfig load to singleton", async () => {
  const dashboardConfig = {
    "DASHBOARD_ENDPOINT": "http://localhost:8087",
    "RemoteComponents": {
      "furyconnectswitchui": {
        "Scope": "FuryConnectSwitchUI",
        "Module": "./FurySupport",
        "Url": "http://localhost:8084/remoteEntry.js",
        "Params": {"apiurl": "http://localhost:8083", "supportserviceid": "ssh.service"}
      }
    }
  };

  const expectedDashboardConfig: DashboardConfig = {
    "DASHBOARD_ENDPOINT": "http://localhost:8087",
    "REMOTE_COMPONENTS": {
      "furyconnectswitchui": {
        "Scope": "FuryConnectSwitchUI",
        "Module": "./FurySupport",
        "Url": "http://localhost:8084/remoteEntry.js",
        "Params": {"apiurl": "http://localhost:8083", "supportserviceid": "ssh.service"}
      }
    }
  };

  new DashboardModule(DashboardConfig.createFromJson(dashboardConfig));

  expect(DashboardConfig.singleton as DashboardConfig).toEqual(expectedDashboardConfig);
})