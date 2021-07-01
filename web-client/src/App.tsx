/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { Module as DashboardModule } from './Components/Dashboard/Module';
import FuryHeader from './Components/Header/WebComponent';
import NavComponent from './Components/Nav/NavPoc';
import './index.scss';
import { DashboardConfig } from './Services/Configuration/DashboardConfig';
import { Router } from './Services/Configuration/Router';
import { HTMLRetriever } from './Services/HTMLRetriever';
import { FuryStorage } from './Services/FuryStorage';
import { FuryModule } from './Services/Configuration/FuryModule';


async function init() {

	FuryStorage.singleton.bootstrapState();

	const conf = await DashboardConfig.createSingletonAsync();

	// Define web components to be used later by the Services/Routing/Router.ts
	const dashboardModuleComponent = await new DashboardModule().loadElementConstructorAsync();


	const htmlRetriever = new HTMLRetriever();

	const header = htmlRetriever.getElementFromSelector('#header');

	// Render components that are always on screen
	header.innerHTML = `<fury-header />`;

	// Render dinamyc components based on routes
	const router = new Router(htmlRetriever.getElementFromId('content'), conf);

	//
	router.add(FuryModule.support, dashboardModuleComponent);
	router.add(FuryModule.subnav, NavComponent);
	router.add(FuryModule.header, FuryHeader);

	//
	router.generateRootRoutes();
}

init();
