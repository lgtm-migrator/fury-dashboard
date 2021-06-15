import { RemoteComponents } from './types';

type ConstructorParams = {
	DASHBOARD_ENDPOINT: any;
	RemoteComponents: any;
};

export class DashboardConfig {
	public readonly DASHBOARD_ENDPOINT?: string;

	public readonly REMOTE_COMPONENTS: RemoteComponents;

	public static singleton: DashboardConfig;

	private constructor(conf: ConstructorParams)
	{
		if (!conf.RemoteComponents) {
			throw new Error('missing dashboard config data');
		}

		this.DASHBOARD_ENDPOINT = conf.DASHBOARD_ENDPOINT;
		this.REMOTE_COMPONENTS = conf.RemoteComponents;
	}

	private static fromEnvOrWindow(): DashboardConfig {
		const dashboardconfig = process.env.DASHBOARD_CONFIG;

		if (!dashboardconfig) {
			throw Error('no DASHBOARD_CONFIG found');
		}

		const parsedConfig = JSON.parse(dashboardconfig);

		if (
			!parsedConfig.DASHBOARD_ENDPOINT ||
			!parsedConfig.RemoteComponents
		)
		{
			throw Error('missing configuration components');
		}

		return new DashboardConfig(parsedConfig);
	}

	private static async fromRemote(
		basePath: string = '',
	): Promise<DashboardConfig> {
		const res = await fetch(`${ basePath }/config/test`);
		const data = await res.json();

		return new DashboardConfig(data.Data);
	}


	public static async createSingletonAsync(): Promise<DashboardConfig> {
		// Take the config from different places based
		// on the enviroment
		if (process.env.SERVER_OFFLINE === 'true') {
			DashboardConfig.singleton =
				DashboardConfig.fromEnvOrWindow();
		} else {
			DashboardConfig.singleton =
				await DashboardConfig.fromRemote(process.env.SERVER_BASE_PATH ?? '');
		}

		return DashboardConfig.singleton;
	}


}
