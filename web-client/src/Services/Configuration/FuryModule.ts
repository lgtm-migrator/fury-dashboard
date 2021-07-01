/**
 * FuryModules key corresponds to the remoteComponents name
 * of the Federated Modules that FURY will contains.
 * This is used to load these remote modules
 */
export enum FuryModule {
	// modules that are imported from the yaml.
	support = 'fury-support',
	// those are modules of the dashboard. Always present
	subnav  = 'fury-subnav',
	header  = 'fury-header'
}
