import { createBrowserHistory } from 'history';
import { Module as DashboardModule } from './Components/Dashboard/Module';
import ComponentLoader from './Components/Dynamic/ComponentLoader';
import FuryHeader from './Components/Header/WebComponent';
import FuryNav from './Components/Nav/FuryNav';
import './index.scss';
import { DashboardConfig } from './Services/ConfigurationLoader/DashboardConfig';
import { Logger } from './Services/Logging/Logger';

async function init() {
	await DashboardConfig.createDashboardConfigSingletonAsync();

	window.customElements.define('fury-header', FuryHeader);
  window.customElements.define('component-loader', ComponentLoader);
	window.customElements.define('fury-nav', FuryNav);

	const history = createBrowserHistory();

	const header = document.querySelector('#header');
	const nav = document.querySelector('#nav');
	const appContent = document.querySelector('#content');
	const footer = document.querySelector('#footer');

	header.innerHTML = `<fury-header />`;
	nav.innerHTML = `<fury-nav />`;

	const routes = {
		'/'       : 'div',
		'/support': 'component-loader',
	};

	const findComponentName = (pathName: string) => {
    Logger.singleton.debug('pathname', pathName);

    const currentRoute = Object.keys(routes).find(route => route.startsWith(pathName));
    if (currentRoute) {
      return routes[currentRoute];
    } else {
      return 'not found';
    }

	};

	const updatePageComponent = (location) => {
		Logger.singleton.debug('location', location);
		appContent.innerHTML = `<${ findComponentName(location.pathname) } />`;
	};

	history.listen(updatePageComponent);
	updatePageComponent(window.location);

	document.addEventListener('click', e => {
		if ((e.target as HTMLAnchorElement).nodeName === 'A') {
			const href = (e.target as HTMLAnchorElement).getAttribute('href');
			history.push(href);
			Logger.singleton.debug('cambio route');
			e.preventDefault();
		}
	});
}

init();
