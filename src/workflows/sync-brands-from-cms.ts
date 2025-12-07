import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CMS_MODULE } from "../modules/cms"
import BrandModuleService from "../modules/brand/service"
import brand, { BRAND_MODULE } from "../modules/brand"

const retrieveBrandsFromCmsStep = createStep(
  "retrieve-brands-from-cms",
  async (_, { container }) => {
    const cmsModuleService = container.resolve(CMS_MODULE);
    const brands = await cmsModuleService.retrieveBrands();
    return new StepResponse(brands);
  }
)

type CreateBrand = {
  name: string;
}

type CreateBrandsInput = {
  brands: CreateBrand[];
}

export const createBrandStep = createStep(
  "create-brands-step",
  async (input: CreateBrandsInput, { container }) => {
    const brandModuleService = container.resolve<BrandModuleService>(BRAND_MODULE);
    const brands = await brandModuleService.createBrands(input.brands);
    return new StepResponse(brands, brands);
  },
  async (brands, { container }) => {
    if (!brands) {
      return;
    }

    const brandModuleService = container.resolve<BrandModuleService>(BRAND_MODULE);

    await brandModuleService.deleteBrands(brands.map(b => b.id));
  }
)