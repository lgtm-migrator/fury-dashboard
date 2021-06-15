/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import {ModuleLoader} from "../Dynamic/ModuleLoader";
import {ClusterMapParams} from "../../Services/ConfigurationLoader/types";

export class Module extends ModuleLoader<ClusterMapParams> {
  public constructor() {
    super(ModuleLoader.moduleNames.furyclustermap);
  }
}
