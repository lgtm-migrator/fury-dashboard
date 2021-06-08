import { RemoteComponents } from './types';


export class DashboardConfig
{

	public readonly DASHBOARD_ENDPOINT: string;

	public readonly REMOTE_COMPONENTS: RemoteComponents;

	public static DASHBOARD_CONFIG_SINGLETON: DashboardConfig = null;

	private constructor(conf: { DASHBOARD_ENDPOINT: any, REMOTE_COMPONENTS: any })
	{

		if (!conf.DASHBOARD_ENDPOINT || conf.REMOTE_COMPONENTS)
		{
			throw new Error('missing dashboard config data');
		}

		this.DASHBOARD_ENDPOINT = conf.DASHBOARD_ENDPOINT;
		this.REMOTE_COMPONENTS = conf.REMOTE_COMPONENTS;
	}

	private static fromEnvOrWindow(): DashboardConfig
	{
		const env = process.env.DASHBOARD_CONFIG;

		if (!env) {
			throw Error('no DASHBOARD_CONFIG found');
		}

		const dashboardConfig = JSON.parse(process.env.DASHBOARD_CONFIG);

		if (!dashboardConfig.DASHBOARD_ENDPOINT || !dashboardConfig.REMOTE_COMPONENTS) {
			throw Error('missing configuration components');
		}

		return new DashboardConfig(dashboardConfig);
	}

	private static async fromRemote(basePath: string = ''): Promise<DashboardConfig>
	{

		const res = await fetch(`${ basePath }/config/test`);
		const data = await res.json();

		return new DashboardConfig(data.Data);
	}

	private static fromFile(): DashboardConfig
	{
		return null;
	}

	public static async createDashboardConfigSingletonAsync(): Promise<DashboardConfig>
	{
		if (process.env.SERVER_OFFLINE === 'true') {
			DashboardConfig.DASHBOARD_CONFIG_SINGLETON = DashboardConfig.fromEnvOrWindow();
		} else {
			DashboardConfig.DASHBOARD_CONFIG_SINGLETON = await DashboardConfig.fromRemote(process.env.SERVER_BASE_PATH ?? '');
		}

		return DashboardConfig.DASHBOARD_CONFIG_SINGLETON;

	}

}
