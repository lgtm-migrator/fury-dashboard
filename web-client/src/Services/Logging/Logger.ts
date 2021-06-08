import log, { levels, LogLevelDesc } from 'loglevel';

export class Logger {

	public readonly instance: log.Logger;

	public static readonly singleton: log.Logger = new Logger("singleton").instance;

	private constructor(name: string) {
		this.instance = log.getLogger(name);
		
		this.instance.setLevel(Logger.getLogLevel());
	}

	private static getLogLevel(): LogLevelDesc {
		switch (process.env.APP_ENV) {
			case 'development':
				return log.levels.DEBUG;
			default:
				return log.levels.WARN;
		}
	}
}
