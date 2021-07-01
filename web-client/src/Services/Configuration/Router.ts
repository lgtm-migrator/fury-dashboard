/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { Router as RouterLibrary } from '@vaadin/router';
import { DashboardConfig } from './DashboardConfig';

import { FuryModule } from './FuryModule';


interface Associations {

	routePath: string

	componentName: FuryModule
}

/**
 * generates the router for the fury-dashboard
 */
export class Router {


	/**
	 * Assigns each Federated Module to a route. If the component is present in the yaml configuration it gets assigned to the route
	 */
	public static moduleRouteAssociations: Associations[] = [
		{
			componentName: FuryModule.support,
			routePath        : '/support',
		},
	];

	private readonly _router: RouterLibrary;

	/**
	 * @param _element html element where the router will be appended
	 * @param _conf dashboard config used to generate the dynamic routes
	 */
	constructor(private _element: HTMLElement, private _conf: DashboardConfig) {
		this._router = new RouterLibrary(this._element);
	}


	public add(componentTag: FuryModule, componentModule: any) {
		window.customElements.define(componentTag, componentModule);
	}


	private generateComponentRoute(path: string, component: FuryModule): RouterLibrary.Route {

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
			this.generateComponentRoute('/sample', FuryModule.subnav),
		];

		// we extract all the yaml remote components defined in the configurations
		for (const yamlComponentName of Object.keys(this._conf.remoteComponents)) {


			// we extract the route configuration for the module
			const routeConfiguration = Router.moduleRouteAssociations.find((e) => e.componentName === yamlComponentName);

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
