/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import React from "react";
import ReactDOM from "react-dom";

import reactToWebComponent from "react-to-webcomponent";

const ErrorDefault = (props: {}) => {
	return (
		// TODO: create and style a Error component
		<div>Errore</div>
	)
}

const ErrorDefaultWebComp: CustomElementConstructor = reactToWebComponent(ErrorDefault, React, ReactDOM);

export default ErrorDefaultWebComp;
