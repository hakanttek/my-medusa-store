import { Module } from "@medusajs/framework/utils";
import { BlogModuleService } from "./service";
import helloWorldLoader from "./loaders/hello-world";
import validationLoader from "./loaders/validate";

export const BLOG_MODULE = "blog";

export default Module(BLOG_MODULE, {
  service: BlogModuleService,
  loaders: [helloWorldLoader, validationLoader],
})