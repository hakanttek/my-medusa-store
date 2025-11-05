import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { BRAND_MODULE } from "../../modules/brand";
import BrandModuleService from "../../modules/brand/service";
import { LinkDefinition } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { Logger } from "@medusajs/medusa";
import { Link } from "@medusajs/framework/modules-sdk";

createProductsWorkflow.hooks.productsCreated(
  (async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE)

    await brandModuleService.retrieveBrand(additional_data.brand_id as string)

    // link brand to product
    const link: Link = container.resolve("link")
    const logger: Logger = container.resolve("logger")

    const links: LinkDefinition[] = []

    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      })
    }

    await link.create(links)

    logger.info("Linked brand to products")

    return new StepResponse(links, links)
  }),
  // dismiss Links in Compensation
  (async (links, { container }) => {
    if (!links?.length)
      return;

    const link = container.resolve("link");
    await link.dismiss(links);
  })
)