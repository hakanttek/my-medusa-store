import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CMS_MODULE } from "../modules/cms"
import BrandModuleService from "../modules/brand/service"
import { BRAND_MODULE } from "../modules/brand"

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

    await brandModuleService.deleteBrands(brands.map(brand => brand.id));
  }
)

type UpdateBrand = {
  id: string;
  name: string;
}

type UpdateBrandsInput = {
  brands: UpdateBrand[];
}

export const updateBrandStep = createStep(
  "update-brands-step",
  async ({ brands }: UpdateBrandsInput, { container }) => {

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);

    const prevUpdatedBrands = await brandModuleService.listBrands({
      id: brands.map((brand) => brand.id),
    })

    const updatedBrands = await brandModuleService.updateBrands(brands);

    return new StepResponse(updatedBrands, prevUpdatedBrands);
  },
  async (prevUpdatedBrands, { container }) => {
    if (!prevUpdatedBrands) {
      return;
    }

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);

    await brandModuleService.updateBrands(prevUpdatedBrands);
  }
)