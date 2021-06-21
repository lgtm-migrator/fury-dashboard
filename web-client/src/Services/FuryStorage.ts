import { ModuleConstants } from './ConfigurationLoader/ModuleAssociation';
import { Language, FuryState } from './ConfigurationLoader/types';

/**
 * @class FuryStorage
 * @description Stores and retrieves the SIGHUP state
 */
export class FuryStorage {

	private static FURY_STATE = 'FURY_STATE';

	public static singleton = new FuryStorage();

	constructor() {
	}

	private refreshLocalStorage() {

		localStorage.setItem(FuryStorage.FURY_STATE, JSON.stringify(window.FURY));
	}

	private getLocalStorageState(): FuryState {

		const state = localStorage.getItem(FuryStorage.FURY_STATE);

		if (!state) {
			throw Error('missing sighup state');
		}

		return JSON.parse(state);
	}

	/**
	 *
	 * @param moduleKey The module key
	 * @param params The module Params object
	 */
	public setModuleValue(moduleKey: string, params: {}) {

		const routeConfiguration = ModuleConstants.routeAssociations.find((e) => e.yamlComponentName === moduleKey);

		if (!window.FURY.modules[moduleKey]) {
			window.FURY.modules[moduleKey] = {};
		}

		window.FURY.modules[moduleKey] = {
			...window.FURY.modules[moduleKey],
			basePath: routeConfiguration ? routeConfiguration.routePath : '/',
			params: {...params},
		};

		this.refreshLocalStorage();

	}

	public setLanguage(language: Language) {

		window.FURY.language = language;

		this.refreshLocalStorage();
	}

	/**
	 * Creates or recover a localStorage SighupState
	 */
	public bootstrapState(): FuryState {


		try {

			const localStorageState = this.getLocalStorageState();
			window.FURY = localStorageState;
			return localStorageState;

		} catch (err) {

			return window.FURY = {
				modules  : {},
				language : 'EN',
				dashboard: true,
			};
		}

	}

	public getState(): FuryState {

		if (!window.FURY) {
			throw Error('no state found');
		}
		return window.FURY;
	}


}
