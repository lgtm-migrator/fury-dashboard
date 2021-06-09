export class HTMLRetriever {

	public getElementFromSelector(selector: string): Element {
		const sel = document.querySelector(selector);

		if (!sel) {
			throw Error(`element not found. Selector: ${ selector }`);
		}

		return sel;
	}

	public getElementFromId(selector: string): HTMLElement {

		const cont = document.getElementById('content');

		if (!cont) {
			throw Error(`element not found. Selector: ${ selector }`);
		}

		return cont;
	}

}
