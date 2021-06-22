/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

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
