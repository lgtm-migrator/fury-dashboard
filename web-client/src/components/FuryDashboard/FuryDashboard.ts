import React from "react";
import ReactDOM from "react-dom";
import FuryDashboardReact from "./FuryDashboardReact";

const template = document.createElement('template');
template.innerHTML = `<link rel="stylesheet" href="./index.css" />`

export default class FuryDashboard extends HTMLElement {
  mountPoint: HTMLDivElement;

  createFuryDashboard() {
    return React.createElement(FuryDashboardReact, {}, React.createElement("slot"));
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    this.mountPoint.setAttribute('class', 'TEST');
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    shadowRoot.appendChild(this.mountPoint);

    ReactDOM.render(this.createFuryDashboard(), this.mountPoint);
  }
} 

