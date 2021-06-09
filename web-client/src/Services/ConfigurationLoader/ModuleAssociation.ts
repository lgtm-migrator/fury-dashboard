interface Associations {
	yamlComponentName: string

	routePath: string

	componentName: string
}

export class ModuleConstants {

	/**
	 * modulesNames key corresponds to the remoteComponents name of the module.
	 * This is used to load the modules
	 */
	public static readonly names = {
		furyconnectswitchui: 'furyconnectswitchui',
		furyclustermap     : 'furyclustermap',
	};

	public static routeAssociations: Associations[] = [
		{
			yamlComponentName: ModuleConstants.names.furyconnectswitchui,
			routePath        : '/support',
			componentName    : 'fury-dashboard',
		},
		{
			yamlComponentName: ModuleConstants.names.furyclustermap,
			routePath        : '/clustermap',
			componentName    : '',
		},
	];

}
