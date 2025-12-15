import { authenticate, defineMiddlewares, validateAndTransformBody, validateAndTransformQuery, } from "@medusajs/framework/http"
import { PostAdminCreateBrand } from "./admin/brands/validators"
import { z } from 'zod'
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { PostStoreReviewSchema } from "../store/reviews/route";

export const GetBrandsSchema = createFindParams();

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
    {
      matcher: "/admin/products",
      method: "POST",
      additionalDataValidator: {
        brand_id: z.string().optional()
      }
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          GetBrandsSchema,
          {
            defaults: [
              "id",
              "name",
              "products.*",
            ],
            isList: true,
          }
        ),
      ],
    },
    {
      method: ["POST"], 
      matcher: "/store/reviews",
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
        validateAndTransformBody(PostStoreReviewSchema),
      ],
    },
  ],
})