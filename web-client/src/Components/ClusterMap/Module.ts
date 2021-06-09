import {ModuleLoader} from "../Dynamic/ModuleLoader";
import {ClusterMapParams} from "../../Services/ConfigurationLoader/types";
import { ModuleConstants } from '../../Services/ConfigurationLoader/ModuleAssociation';

export class Module extends ModuleLoader<ClusterMapParams> {
  public constructor() {
    super(ModuleConstants.names.furyclustermap);
  }
}
