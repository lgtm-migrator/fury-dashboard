### Fury Dashboard UI

This interface will include all the future UIs related to our Fury standalone services, as per [`fury-connect-switch`](https://github.com/sighupio/fury-connect-switch).

![populated dashboard](../docs/populated-dashboard.png)

### Local Development

Go into the `/web-client` folder and run `yarn dev` or `yarn start` to run the project.

#### [OPTIONAL] Styling ShadowDOM components
In the bad case to style the components that needs to be rendered inside a ShadowDOM, you need to create and inject a `template` that imports the global `fury-design-system` compiled styles like this:
```js
  // MyCompnent.ts
  const template = document.createElement('template');
  template.innerHTML = `<link rel="stylesheet" href="./index.css" />`
  // index.css it's the compiled file that webpack bundle

  export default class MyComponent extends HTMLElement {
    ...
    connectedCallback() {
      ...
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
```

```js
  // app.tsx
  window.customElements.define("my-component-tag", MyComponent);
```
After that you'll have global style also inside your component, now if you want to add custom rules for your component you can simply add a `MyComponents.scss` file and target your component like this
```css
  /* MyComponent.scss */
  my-component-tag {
    /* Your SCSS Rules */
  }
```
#### [WARNING] Css and ShadowDOM
Keep in mind that css of imported shadowDOM components will not be included because of the shadowDOM encapsulation!!!

**WATCH OUT** This project needs other active services (for now only one) to shows the true aggregator functionality of dashboard. You can see the whole picture by downloading and running also the [`fury-connect-switch`](https://github.com/sighupio/fury-connect-switch/tree/ui) project.

If no services will be found, you'll simply see the empty dashboard and a text that tells about the services you are trying to import.

![empty dashboard](../docs/empty-dashboard.png)
