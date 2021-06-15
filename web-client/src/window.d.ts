/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

export declare global {
	interface Window {
		[key: string]: any

		DASHBOARD_CONFIG: {
			REMOTE_COMPONENTS: {
				[key: string]: {
					Scope: string;
					Module: string;
					Url: string;
					Params?: {
						[key: string]: any;
					};
				};
			};
		};

		APP_CONFIG: {
			APP_ENDPOINT: string;
		};
	}
}

