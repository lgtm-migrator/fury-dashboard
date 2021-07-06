/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

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
