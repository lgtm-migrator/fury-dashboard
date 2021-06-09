import React from "react";
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

const FuryHeaderReact = (props: {}) => {
  const breadcrumbs = [
    {
      text: "Organization: FooCompany",
      href: "#",
      onClick: (e: Event) => {
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
          breadcrumbs={
            /*TODO */
            breadcrumbs as any}
          aria-label="Header breadcrumbs example"
        />
      </EuiHeader>
      <EuiSpacer size="xxl" />
    </>
  );
};

export default FuryHeaderReact;

