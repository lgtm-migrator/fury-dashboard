/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {Module as DashboardModule} from "../Dashboard/Module";
import NavComponent from '../Nav/NavPoc';
import reactToWebComponent from "react-to-webcomponent";

const Router = (props: {}) => {
  const [currentElement, setCurrentElement] = useState('');

  const basePath = window.location.pathname;

  const urlMatch = (basepath: string, route: string) => {
    // TODO: enhance regex controls to allow subpath
    // but avoid similar path to ovverrides
    const exp = `^\/${route}`;
    const regex = new RegExp(exp);
    console.log('test', basepath, ((basepath.match(regex)?.input ?? '')))
    // 
    return (basepath.match(regex)?.input ?? '')
  }

  const WebComponentRenderer = () => {

  }

  useEffect(() => {
    const str = window.location.pathname;

    // console.log('match', str.match(/^\/sample/)['input'])
    switch(str) {
      case urlMatch(str, 'support'):
        setCurrentElement('<div>CIAO SUPPORT</div>')
        break;
      case urlMatch(str, 'sample'):
        // simulation of a component with subrouting
        const exist = window.customElements.get('fury-subnav');
        !exist && window.customElements.define('fury-subnav', NavComponent);
        setCurrentElement(`<fury-subnav />`);
        break;
      case urlMatch(str, 'sampletest'):
        setCurrentElement(`<div>SAMPLETEST</div>`);
        break;
      case '/':
        const dashboardModuleComponent = (new DashboardModule()).loadElementConstructorAsync().then((el) => {
          window.customElements.define('fury-dashboard', el);
          setCurrentElement(`<fury-dashboard />`);
        })
        break;
      default:
        // TODO: create the 404 component
        setCurrentElement('<div>404 error</div>')
    }
  }, [])

	return (
    <div dangerouslySetInnerHTML={{__html: currentElement}}></div>
	)
}

const ComponentLoader: CustomElementConstructor = reactToWebComponent(Router, React, ReactDOM);

export default ComponentLoader;
