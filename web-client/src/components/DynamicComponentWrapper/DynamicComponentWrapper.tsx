import React , { Suspense, lazy } from 'react';
import { useDynamicScript, loadComponent } from "../../utils/dynamicModuleLoader";

interface DynamicComponentWrapperProps {
  componentConfig: {
    url: string;
    module: string;
    scope: string;
  }
};

export const DynamicComponentWrapper = (props: DynamicComponentWrapperProps) => {
  const { ready, failed } = useDynamicScript({
    url: props.componentConfig && props.componentConfig.url,
  });

  if (!props.componentConfig) {
    return <h2>Not componentConfig specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.componentConfig.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.componentConfig.url}</h2>;
  }

  const Component = lazy(
    loadComponent(props.componentConfig.scope, props.componentConfig.module)
  );

  return (
    <Suspense fallback="Loading System">
      <Component />
    </Suspense>
  );
};

