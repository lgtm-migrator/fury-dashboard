import { Language, SighupState } from './ConfigurationLoader/types';

/**
 * @class SighupStorage
 * @description Stores and retrieves the SIGHUP state
 */
export class SighupStorage {

	private static SIGHUP_STATE = 'SIGHUP_STATE';

	public static singleton = new SighupStorage();

	constructor() {
	}

	private refreshLocalStorage() {

		localStorage.setItem('SIGHUP_STATE', JSON.stringify(window.SIGHUP));
	}

	private getLocalStorageState(): SighupState {

		const state = localStorage.getItem(SighupStorage.SIGHUP_STATE);

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

		if (!window.SIGHUP.modules[moduleKey]) {
			window.SIGHUP.modules[moduleKey] = {};
		}

		window.SIGHUP.modules[moduleKey] = {
			...window.SIGHUP.modules[moduleKey],
			...params,
		};

		this.refreshLocalStorage();

	}

	public setLanguage(language: Language) {

		window.SIGHUP.language = language;

		this.refreshLocalStorage();
	}

	/**
	 * Creates or recover a localStorage SighupState
	 */
	public bootstrapState(): SighupState {


		try {

			const localStorageState = this.getLocalStorageState();
			window.SIGHUP = localStorageState;
			return localStorageState;

		} catch (err) {

			return window.SIGHUP = {
				modules : {},
				language: 'IT',
			};
		}

	}

	public getState(): SighupState {

		if (!window.SIGHUP) {
			throw Error('no state found');
		}
		return window.SIGHUP;
	}


}
