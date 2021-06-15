/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import React from "react";
import ReactDOM from "react-dom";
import FuryHeaderReact from "./HeaderComponent";

import reactToWebComponent from "react-to-webcomponent";

const HeaderWebComponent = reactToWebComponent(FuryHeaderReact, React, ReactDOM);

export default HeaderWebComponent;

