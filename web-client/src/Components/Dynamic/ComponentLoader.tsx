import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {Module as DashboardModule} from "../Dashboard/Module";
import { createBrowserHistory } from 'history';
import reactToWebComponent from "react-to-webcomponent";
import { Logger } from '../../Services/Logging/Logger';

const Router = (props) => {
  const [currentElement, setCurrentElement] = useState('');

  useEffect(() => {
    switch(window.location.pathname) {
      case '/support':
        const dashboardModuleComponent = (new DashboardModule()).loadElementConstructorAsync().then((el) => {
          window.customElements.define('fury-dashboard', el);
          setCurrentElement(`<fury-dashboard />`);
        })
    }
  }, [])

	return (
    <div dangerouslySetInnerHTML={{__html: currentElement}}></div>
	)
}

const ComponentLoader: CustomElementConstructor = reactToWebComponent(Router, React, ReactDOM);

export default ComponentLoader;
