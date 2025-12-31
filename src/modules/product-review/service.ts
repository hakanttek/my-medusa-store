import { InjectManager, MedusaContext, MedusaService } from "@medusajs/framework/utils"
import Review from "./models/review"
import { EntityManager } from "@medusajs/framework/mikro-orm/knex"
import { Context } from "@medusajs/framework/types"

class ProductReviewModuleService extends MedusaService({
  Review,
}) {
  @InjectManager()
  async getAverageRating(
    productId: string,
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<number> {
    const result = await sharedContext?.manager?.execute(
      `SELECT AVG(rating) as average 
       FROM review 
       WHERE product_id = '${productId}' AND status = 'approved'`
    )

    return parseFloat(parseFloat(result?.[0]?.average ?? 0).toFixed(2))
  }
}

export default ProductReviewModuleService