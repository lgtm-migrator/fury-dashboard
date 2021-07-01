/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { Factory } from 'fury-component';

export class Logger {

	public readonly instance;

	public static readonly singleton = Factory.logger({
			level: Logger.getLogLevel(),
		},
		{
			name: 'DASHBOARD_SINGLETON',
		});

	private constructor(name: string) {


		this.instance = Factory.logger({
				level: Logger.getLogLevel(),
			},
			{
				name: name,
			});

	}

	private static getLogLevel(): 'debug' | 'warn' {
		switch (process.env.APP_ENV) {
			case 'development':
				return 'debug';
			default:
				return 'warn';
		}
	}
}
