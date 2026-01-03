import { Module } from "@medusajs/framework/utils";
import BrandModuleService from "./service";
import brandLoader from "./loaders/brand-loader";

export const BRAND_MODULE = "brand";

export default Module(BRAND_MODULE, {
  service: BrandModuleService,
  loaders: [brandLoader]
})