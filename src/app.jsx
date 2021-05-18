import React, { useEffect, useState, Suspense, lazy } from "react";

const loadComponent = (scope, module) => async () => {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const Module = factory();
  // console.log('module', Module)
  return Module;
};

const useDynamicScript = (args) => {
  console.log("args", args);
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

// TODO: enable multiple federated module imports
// now it's only a toggle from a component to another
const System = (props) => {
  console.log("system 3001", props);
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });

  if (!props.system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <Suspense fallback="Loading System">
      <Component />
    </Suspense>
  );
};

export default function Dashboard() {
  const [system, setSystem] = useState(undefined);
  // INFO: Each state variable represents a remote component from a federated module
  // const [remoteComponent, setRemoteComponent] = useState(undefined);

  // TODO: integrate endpoint configuration
  // and structure the project as standalone
  // (GOLANG project as the others?)
  const importSwitchUi = () => {
    const apiurl = { APP_ENDPOINT: "http://0.0.0.0:8083" };
    window.APP_CONFIG = apiurl;
    setSystem({
      url: "http://localhost:8083/remoteEntry.js",
      scope: "FuryConnectSwitchUI",
      module: "./FuryConnectSwitchUI",
    });
  };

  // INFO: Each remote component needs a configuration object in order to retrieve lazily the module from remote entrypoint
  // const importRemoteComponent = () => {
  //   setRemoteComponent({
  //     url: "<REMOTE_URL>/<REMOTE_MODULE>.js",
  //     scope: "<REMOTE_SCOPE>",
  //     module: "./<REMOTE_MODULE>",
  //   });
  // };

  useEffect(() => {
    importSwitchUi();
    // INFO: Here on mount we load every remote component
    // importRemoteComponent();
  }, []);

  return (
    <>
      <h1>This is the Dashboard</h1>
      {/* <button onClick={importSwitchUi}>Load Switch UI</button> */}
      <System system={system} />
      {/* INFO: In order to render the remote component, we make use of the wrapper component System */}
      {/* <System system={remoteComponent} /> */}
    </>
  );
}
