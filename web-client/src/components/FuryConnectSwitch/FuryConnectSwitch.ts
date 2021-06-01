import React from "react";
import ReactDOM from "react-dom";
import FuryConnectSwitchReact from "./FuryConnectSwitchReact";

export default class FuryConnectSwitch extends HTMLElement {
  mountPoint: HTMLDivElement;

  createFuryConnectSwitch() {
    return React.createElement(FuryConnectSwitchReact, {}, React.createElement("content"));
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(this.mountPoint);

    ReactDOM.render(this.createFuryConnectSwitch(), this.mountPoint);
  }
} 

