import {ModuleLoader} from "../Dynamic/ModuleLoader";
import {ClusterMapParams} from "../../Services/ConfigurationLoader/types";

export class Module extends ModuleLoader<ClusterMapParams> {
  public constructor() {
    super(ModuleLoader.moduleNames.furyclustermap);
  }
}
