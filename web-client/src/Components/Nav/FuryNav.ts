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
        <a href="/sample">Sample</a>
      </li>
    </ul>
    `;

    return this.mountPoint;
  }
}
