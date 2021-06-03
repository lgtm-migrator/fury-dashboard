import React, { useEffect, useState } from "react";
import {
  EuiBadge,
  EuiHeader,
  EuiSpacer,
  EuiHeaderLogo,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderBreadcrumbs,
  EuiHeaderSectionItem,
} from "fury-design-system";
import logo from "../../assets/logo.svg";
import { DynamicComponentWrapper } from "../DynamicComponentWrapper/DynamicComponentWrapper";
import './FuryDashboardReact.scss'

export default function FuryDashboardReact() {
  // INFO: Each state variable represents a remote component from a federated module
  const [furyDashboard, setFuryDashboard] = useState(undefined);
  // const [remoteComponent, setRemoteComponent] = useState(undefined);

  // TODO: integrate endpoint configuration
  // and structure the project as standalone
  // (GOLANG project as the others?)
  const importFurySupport = () => {
    const remoteFuryConnectSwitchUIConfig =
      window.DASHBOARD_CONFIG ?
      window.DASHBOARD_CONFIG.REMOTE_COMPONENTS.furyconnectswitchui :
      JSON.parse(process.env.DASHBOARD_CONFIG).REMOTE_COMPONENTS.furyconnectswitchui;
    const apiurl = {
      APP_ENDPOINT: remoteFuryConnectSwitchUIConfig.Params.apiurl,
    };
    window.APP_CONFIG = apiurl;
    setFuryDashboard({
      url: remoteFuryConnectSwitchUIConfig.Url,
      scope: remoteFuryConnectSwitchUIConfig.Scope,
      module: remoteFuryConnectSwitchUIConfig.Module,
    });
  };

  // INFO: Each remote component needs a
  // configuration object in order to retrieve
  // lazily the module from remote entrypoint
  // const importRemoteComponent = () => {
  //   setRemoteComponent({
  //     url: "<REMOTE_URL>/<REMOTE_MODULE>.js",
  //     scope: "<REMOTE_SCOPE>",
  //     module: "./<REMOTE_MODULE>",
  //   });
  // };

  useEffect(() => {
    // INFO: Here on mount we load
    // every remote component
    importFurySupport();
    // importRemoteComponent();
  }, []);

  const breadcrumbs = [
    {
      text: "Organization: FooCompany",
      href: "#",
      onClick: (e) => {
        e.preventDefault();
      },
    },
    // {
    //   text: 'Namespace: Dev',
    //   href: '#',
    //   onClick: (e) => {
    //     e.preventDefault();
    //   },
    //   'data-test-subj': 'breadcrumbsAnimals',
    //   className: 'customClass',
    // },
    // {
    //   text: 'Node: Test Node',
    // },
  ];

  return (
    <>
      {/* Sample Static Headers */}
      <EuiHeader theme="dark">
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo iconType={logo}>F U R Y</EuiHeaderLogo>
          <EuiBadge color="primary">V.1.5.1</EuiBadge>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem></EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <EuiHeaderLinks aria-label="App navigation links example">
            <EuiHeaderLink iconType="help">Help</EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeader>
      <EuiHeader>
        <EuiHeaderBreadcrumbs
          breadcrumbs={breadcrumbs}
          aria-label="Header breadcrumbs example"
        />
      </EuiHeader>
      <EuiSpacer size="xxl" />

      {/* INFO: In order to render the remote component, we make use of the wrapper component DynamicComponentWrapper */}
      <DynamicComponentWrapper componentConfig={furyDashboard} />
      {/* <DynamicComponentWrapper componentConfig={remoteComponent} /> */}
    </>
  );
}
