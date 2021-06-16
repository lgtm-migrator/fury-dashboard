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
			componentName    : 'fury-support',
		},
		// {
		// 	yamlComponentName: ModuleConstants.names.furyclustermap,
		// 	routePath        : '/clustermap',
		// 	componentName    : '',
		// },
	];

}
