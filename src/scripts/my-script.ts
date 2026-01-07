import { 
  ExecArgs,
} from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function myScript({ container }: ExecArgs) {
  const productModuleService = container.resolve(
    Modules.PRODUCT
  )

  const [, count] = await productModuleService
    .listAndCountProducts()

  console.log(`You have ${count} product(s)`)
}