import winston from 'winston';
import { Logger as LoggerType } from 'winston';


export class Logger {

	public readonly instance: LoggerType;

	public static readonly singleton: LoggerType = new Logger().instance;

	constructor() {
		this.instance = winston.createLogger({
			level: Logger.getLogLevel(),
			//format: winston.format.json(),
		});

		if (process.env.NODE_ENV !== 'production') {
			this.instance.add(new winston.transports.Console({
				format: winston.format.simple(),
			}));
		}
	}

	private static getLogLevel(): string {
		switch (process.env.APP_ENV) {
			case 'development':
				return 'debug';
			default:
				return 'info';
		}
	}
}
