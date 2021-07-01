/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import React, { useState } from 'react';
import {
  EuiBadge,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiSelect,
} from 'fury-design-system';
import './HeaderComponent.css';
import logo from '../../Assets/logo.svg';
import theme from 'fury-design-system/dist/eui_theme_light.json';
import { Logger } from '../../Services/Logging/Logger';
import { FuryStorage } from '../../Services/FuryStorage';

Logger.singleton.log('theme', JSON.stringify(theme))

const changeLanguage = (e: any) => {
  e.target?.value && FuryStorage.singleton.setLanguage(e.target.value);
  window.location.reload();
}


const FuryHeaderReact = (theme: any) => {
  const options = [
    { value: 'IT', text: 'Italiano' },
    { value: 'EN', text: 'English' },
  ];

  const [currentLang, setCurrentLang] = useState(FuryStorage.singleton.getState().language);

  Logger.singleton.log('lang', currentLang);


  return (
    <>
      <EuiHeader theme="dark">
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo iconType={logo}>FURY Intelligent Platform</EuiHeaderLogo>
          <p>for: </p><EuiBadge color="primary">Awesome Customer Name</EuiBadge>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <EuiSelect
            options={options}
            value={currentLang}
            onChange={changeLanguage}
          />
        </EuiHeaderSectionItem>
      </EuiHeader>

      <EuiHeader >
        <EuiHeaderSectionItem>
          <EuiHeaderLinks aria-label="App navigation links example">
            <EuiHeaderLink iconType="home" href="/">Home</EuiHeaderLink>
            <EuiHeaderLink href="/sample">Sample Page</EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>


        <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="test">
            <EuiHeaderLink iconType="help" href="/support">Live Support</EuiHeaderLink>
        </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeader>
    </>
  );
};

export default FuryHeaderReact;

