import { Module as DashboardModule } from "./Components/Dashboard/Module";
import ComponentLoader from "./Components/Dynamic/ComponentLoader";
import FuryHeader from "./Components/Header/WebComponent";
import FuryNav from "./Components/Nav/FuryNav";
import NavComponent from "./Components/Nav/NavPoc";
import "./index.scss";
import { DashboardConfig } from "./Services/ConfigurationLoader/DashboardConfig";
import { Logger } from "./Services/Logging/Logger";
import { Router } from "@vaadin/router";

async function init() {
  await DashboardConfig.createDashboardConfigSingletonAsync();

  const dashboardModuleComponent =
    await new DashboardModule().loadElementConstructorAsync();
  window.customElements.define("fury-dashboard", dashboardModuleComponent);
  window.customElements.define("fury-subnav", NavComponent);
  window.customElements.define("fury-header", FuryHeader);
  window.customElements.define("component-loader", ComponentLoader);
  window.customElements.define("fury-nav", FuryNav);

  const header = document.querySelector("#header");
  const nav = document.querySelector("#nav");
  const appContent = document.querySelector("#content");
  const footer = document.querySelector("#footer");

  header.innerHTML = `<fury-header />`;
  nav.innerHTML = `<fury-nav />`;

  const router = new Router(document.getElementById("content"));
  router.setRoutes([
    { path: "/", component: "fury-dashboard" },
    { path: "/support", component: "fury-dashboard" },
    { path: "/sample", children: [
			{ path: "(.*)", component: "fury-subnav" }
		]},
  ]);
}

init();
