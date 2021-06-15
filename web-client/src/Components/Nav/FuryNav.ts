/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

const template = document.createElement("template");
template.innerHTML = `<link rel="stylesheet" href="./index.css" />`;

export default class FuryNav extends HTMLElement {
  mountPoint: HTMLElement;

  connectedCallback() {
    this.mountPoint = document.createElement("nav");
    this.mountPoint.setAttribute("class", "TEST");
    this.mountPoint.appendChild(template);
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    shadowRoot.appendChild(this.mountPoint);

    this.mountPoint.innerHTML = `
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/support">Support</a>
      </li>
    </ul>
    `;

    return this.mountPoint;
  }
}
