import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CMS_MODULE } from "../modules/cms"

const retrieveBrandsFromCmsStep = createStep(
  "retrieve-brands-from-cms",
  async (_, { container }) => {
    const cmsModuleService = container.resolve(CMS_MODULE);
    const brands = await cmsModuleService.retrieveBrands();
    return new StepResponse(brands);
  }
)