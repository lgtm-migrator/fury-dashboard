/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { Registry } from '../WebComponents/Registry';

interface Associations {
	yamlComponentName: string

	routePath: string

	componentName: string
}

/**
 * Contains the constants for the Modules
 */
export class ModuleConstants {

	/**
	 * ModulesNames key corresponds to the remoteComponents name 
	 * of the Federated Modules that FURY will contains.
	 * This is used to load these remote modules
	 */
	public static readonly names = {
		furyconnectswitchui: 'furyconnectswitchui',
		furyclustermap     : 'furyclustermap',
	};

	/**
	 * Assigns each Federated Module to a route
	 */
	public static routeAssociations: Associations[] = [
		{
			yamlComponentName: ModuleConstants.names.furyconnectswitchui,
			routePath        : '/support',
			componentName    : Registry.ComponentTagList.FurySupport,
		},
		// {
		// 	yamlComponentName: ModuleConstants.names.furyclustermap,
		// 	routePath        : '/clustermap',
		// 	componentName    : '',
		// },
	];

}
