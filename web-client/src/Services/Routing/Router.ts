import { Router as RouterLibrary } from '@vaadin/router';
import { DashboardConfig } from '../ConfigurationLoader/DashboardConfig';
import { ModuleConstants } from '../ConfigurationLoader/ModuleAssociation';
import { Registry } from "../WebComponents/Registry";

/**
 * generates the router for the fury-dashboard
 */
export class Router {

	private readonly _router: RouterLibrary;

	/**
	 * @param _element html element where the router will be appended
	 * @param _conf dashboard config used to generate the dynamic routes
	 */
	constructor(private _element: HTMLElement, private _conf: DashboardConfig) {
		this._router = new RouterLibrary(this._element);
	}


	private generateComponentRoute(path: string, component: string): RouterLibrary.Route {

		// we need (.*) to delegate all the subpath to the dynamically loaded module.
		// example: /support -> /support/ex should be handled always by /support
		return { path, children: [{ path: '(.*)', component }] };
	}

	/**
	 * Generates the static routes and the routes needed by the modules defined in the yaml
	 */
	public generateRootRoutes() {

		// we define here the static routes of the application.
		const routes: RouterLibrary.Route[] = [
			{ path: '/', component: '' },
			// Example of static component routing
			this.generateComponentRoute('/sample', Registry.ComponentTagList.FurySubNav),
		];

		// we extract all the yaml remote components defined in the configurations
		for (const yamlComponentName of Object.keys(this._conf.REMOTE_COMPONENTS)) {


			// we extract the route configuration for the module
			const routeConfiguration = ModuleConstants.routeAssociations.find((e) => e.yamlComponentName === yamlComponentName);

			if (!routeConfiguration) {
				throw Error('module not supported by fury dashboard. Check the module name. Module name: ' + yamlComponentName);
			}

			// we create the route with the extracted configuration
			routes.push(this.generateComponentRoute(routeConfiguration.routePath, routeConfiguration.componentName));

		}

		//todo push catchall route
		// routes.push();

		this._router.setRoutes(routes);
	}
}
