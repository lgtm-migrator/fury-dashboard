import React from "react";
import ReactDOM from "react-dom";
import FuryHeaderReact from "./HeaderComponent";

import reactToWebComponent from "react-to-webcomponent";

const HeaderWebComponent = reactToWebComponent(FuryHeaderReact, React, ReactDOM);

export default HeaderWebComponent;

