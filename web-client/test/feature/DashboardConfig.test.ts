/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import {DashboardConfig} from "../../src/Services/ConfigurationLoader/DashboardConfig";
import {Module as DashboardModule} from "../../src/Components/Dashboard/Module";

test("DashboardConfig load to singleton", async () => {
  const dashboardConfig = {
    "DASHBOARD_ENDPOINT": "http://localhost:8087",
    "remoteComponents": {
      "furyconnectswitchui": {
        "scope": "FuryConnectSwitchUI",
        "module": "./FurySupport",
        "url": "http://localhost:8084/remoteEntry.js",
        "params": {"apiurl": "http://localhost:8083", "supportserviceid": "ssh.service"}
      }
    }
  };

  const expectedDashboardConfig: DashboardConfig = {
    "DASHBOARD_ENDPOINT": "http://localhost:8087",
    "REMOTE_COMPONENTS": {
      "furyconnectswitchui": {
        "scope": "FuryConnectSwitchUI",
        "module": "./FurySupport",
        "url": "http://localhost:8084/remoteEntry.js",
        "params": {"apiurl": "http://localhost:8083", "supportserviceid": "ssh.service"}
      }
    }
  };

  new DashboardModule(DashboardConfig.createFromJson(dashboardConfig));

  expect(DashboardConfig.singleton as DashboardConfig).toEqual(expectedDashboardConfig);
})