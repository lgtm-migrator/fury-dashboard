interface RemoteScript {
  url: string;
  module: string;
  scope: string;
}

interface LoaderResult {
  error: string;
  module: any
}

export class RemoteScriptLoader {
  componentConfig: RemoteScript;

  constructor(componentConfig: RemoteScript) {
    this.componentConfig = componentConfig;
  }

  private async successHandler () {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // @ts-ignore
    await __webpack_init_sharing__("default");
    const container = window[this.componentConfig.scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await window[this.componentConfig.scope].get(this.componentConfig.module);
    const Module = factory();
    // console.log('module', Module)
    return {
      error: null,
      module: Module
    };
  };

  private async failHandler() {

    return {
      error: "",
      module: null
    }
  }

  
  useDynamicScriptAsync (): Promise<LoaderResult> {
    return new Promise((resolve, reject) => {
    if (!this.componentConfig.url) {
      return;
    }
  
    const element = document.createElement("script");
  
    element.src = this.componentConfig.url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${this.componentConfig.url}`);
      // modificare il dom a seguito del success
      resolve(this.successHandler());
      
    };
  
    element.onerror = () => {
      console.error(`Dynamic Script Error: ${this.componentConfig.url}`);
      // modificare il dom a seguito dell'errore
      reject(this.failHandler());
    };
  
    document.head.appendChild(element);
    });
  };

};
