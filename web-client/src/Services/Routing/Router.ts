/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { Router as RouterLibrary } from '@vaadin/router';

export class Router {

	private readonly _router: RouterLibrary;

	constructor(private _element: HTMLElement) {
		this._router = new RouterLibrary(this._element);
	}


	private generateComponentRoute(path: string, component: string): RouterLibrary.Route {

		return { path, children: [{ path: '(.*)', component }] };
	}

	public setRoutes() {
		this._router.setRoutes([
			{ path: '/', component: 'fury-dashboard' },
			this.generateComponentRoute('/support', 'fury-dashboard'),
			this.generateComponentRoute('/sample', 'fury-subnav'),
		]);
	}
}
