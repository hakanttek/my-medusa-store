import { MedusaService } from "@medusajs/framework/utils";
import { Post } from "./models/post";

type ModuleOptions = {
  capitalize?: boolean
}

export class BlogModuleService extends MedusaService({ Post }) {

  protected options_: ModuleOptions;

  constructor({ }, options?: ModuleOptions) {
    super(...arguments);
    this.options_ = options || {
      capitalize: false
    };
  }
}