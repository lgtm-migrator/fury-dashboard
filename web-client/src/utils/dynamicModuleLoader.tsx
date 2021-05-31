import { useState, useEffect } from 'react';

interface DynamiScriptArgs {
  url: string;
}

export const loadComponent = (scope: string, module: string) => async () => {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // @ts-ignore
  await __webpack_init_sharing__("default");
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);
  // @ts-ignore
  const factory = await window[scope].get(module);
  const Module = factory();
  // console.log('module', Module)
  return Module;
};

export const useDynamicScript = (args: DynamiScriptArgs) => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

