import { Module as DashboardModule } from './Components/Dashboard/Module';
import FuryHeader from './Components/Header/WebComponent';
import NavComponent from './Components/Nav/NavPoc';
import './index.scss';
import { DashboardConfig } from './Services/ConfigurationLoader/DashboardConfig';
import { Router } from './Services/Routing/Router';
import { HTMLRetriever } from './Services/HTMLRetriever';
import { FuryStorage } from './Services/FuryStorage';


async function init() {

	FuryStorage.singleton.bootstrapState();

	const conf = await DashboardConfig.createSingletonAsync();

	// Define web components to be used later by the Services/Routing/Router.ts
	const dashboardModuleComponent = await new DashboardModule().loadElementConstructorAsync();
	window.customElements.define('fury-support', dashboardModuleComponent);
	window.customElements.define('fury-subnav', NavComponent);
	window.customElements.define('fury-header', FuryHeader);

	const htmlRetriever = new HTMLRetriever();

	const header = htmlRetriever.getElementFromSelector('#header');
	const nav = htmlRetriever.getElementFromSelector('#nav');
	const footer = htmlRetriever.getElementFromSelector('#footer');

	// Render components that are always on screen
	header.innerHTML = `<fury-header />`;

	// Render dinamyc components based on routes
	new Router(htmlRetriever.getElementFromId('content'), conf).generateRootRoutes();
}

init();
