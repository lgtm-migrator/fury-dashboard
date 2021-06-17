import {ModuleLoader} from "../Dynamic/ModuleLoader";
import {ClusterMapParams} from "../../Services/ConfigurationLoader/types";
import { ModuleConstants } from '../../Services/ConfigurationLoader/ModuleAssociation';
import {DashboardConfig} from "../../Services/ConfigurationLoader/DashboardConfig";

export class Module extends ModuleLoader<ClusterMapParams> {
  public constructor(dashboardConfig = DashboardConfig.singleton) {
    super(ModuleConstants.names.furyclustermap, dashboardConfig);
  }
}
