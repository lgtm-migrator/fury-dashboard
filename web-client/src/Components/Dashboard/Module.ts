import { ModuleLoader } from "../Dynamic/ModuleLoader";
import { RemoteScriptLoader } from "../Dynamic/RemoteScriptLoader"

const getFuryDashboardRemoteModuleData = () => {
  const remoteFuryConnectSwitchUIConfig = window.DASHBOARD_CONFIG
    ? window.DASHBOARD_CONFIG.REMOTE_COMPONENTS.furyconnectswitchui
    : JSON.parse(process.env.DASHBOARD_CONFIG).REMOTE_COMPONENTS
        .furyconnectswitchui;
  const apiurl = {
    APP_ENDPOINT: remoteFuryConnectSwitchUIConfig.Params.apiurl,
  };
  window.APP_CONFIG = apiurl;
  return {
    url: remoteFuryConnectSwitchUIConfig.Url,
    scope: remoteFuryConnectSwitchUIConfig.Scope,
    module: remoteFuryConnectSwitchUIConfig.Module,
  };
};

export class Module extends ModuleLoader {
  async implementation () {
    const dynamicLoadOutcome = await (new RemoteScriptLoader(
      getFuryDashboardRemoteModuleData()
    )).useDynamicScriptAsync();
  
    if (dynamicLoadOutcome.module) {
      return dynamicLoadOutcome.module;
    }
  }
  
  errorModule () {
    throw Error('failed load');
  }
};

// const template = document.createElement('template');
// template.innerHTML = `<link rel="stylesheet" href="./index.css" />`
//
// export default class FuryDashboard extends HTMLElement {
//   mountPoint: HTMLDivElement;
//
//   createFuryDashboard() {
//     return React.createElement(FuryDashboardReact, {}, React.createElement("slot"));
//   }
//
//   connectedCallback() {
//     this.mountPoint = document.createElement("div");
//     this.mountPoint.setAttribute('class', 'TEST');
//     const shadowRoot = this.attachShadow({ mode: "open" });
//     shadowRoot.appendChild(template.content.cloneNode(true));
//     shadowRoot.appendChild(this.mountPoint);
//
//     ReactDOM.render(this.createFuryDashboard(), this.mountPoint);
//   }
// }
//
