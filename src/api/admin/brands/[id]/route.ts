import { z } from "zod"
import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { createBrandWorkflow } from "../../../../workflows/create-brand"
import { PostAdminCreateBrand } from "./../validators"

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params;

  const query = req.scope.resolve("query");

  const {
    data: brands,
  } = await query.graph({
    entity: "brand",
    filters: { id },
    fields: ["*", "products.*"]
  });

  if (!brands?.length) {
    res.status(404).json({ message: "Brand not found" })
  }

  res.json({
    brand: brands[0]
  })
}