import { Module as DashboardModule } from './Components/Dashboard/Module';
import ComponentLoader from './Components/Dynamic/ComponentLoader';
import FuryHeader from './Components/Header/WebComponent';
import FuryNav from './Components/Nav/FuryNav';
import NavComponent from './Components/Nav/NavPoc';
import './index.scss';
import { DashboardConfig } from './Services/ConfigurationLoader/DashboardConfig';
import { Router } from './Services/Routing/Router';
import { HTMLRetriever } from './Services/HTMLRetriever';
import { FuryStorage } from './Services/FuryStorage';


async function init() {

	FuryStorage.singleton.bootstrapState();

	const conf = await DashboardConfig.createSingletonAsync();

	const dashboardModuleComponent = await new DashboardModule().loadElementConstructorAsync();
	window.customElements.define('fury-dashboard', dashboardModuleComponent);
	window.customElements.define('fury-subnav', NavComponent);
	window.customElements.define('fury-header', FuryHeader);
	window.customElements.define('component-loader', ComponentLoader);
	window.customElements.define('fury-nav', FuryNav);

	const htmlRetriever = new HTMLRetriever();

	const header = htmlRetriever.getElementFromSelector('#header');
	const nav = htmlRetriever.getElementFromSelector('#nav');
	const appContent = htmlRetriever.getElementFromSelector('#content');
	const footer = htmlRetriever.getElementFromSelector('#footer');

	header.innerHTML = `<fury-header />`;
	nav.innerHTML = `<fury-nav />`;

	new Router(htmlRetriever.getElementFromId('content'), conf).generateRootRoutes();
}

init();
