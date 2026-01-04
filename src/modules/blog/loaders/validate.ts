import { LoaderOptions, Logger } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"

type InjectedDependencies = {
  logger: Logger,
}

// recommended to define type in another file
type ModuleOptions = {
  apiKey?: string
}

export default async function validationLoader({ container, options }: LoaderOptions<ModuleOptions>) {

  const logger = container.resolve("logger");

  if (!options?.apiKey) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Blog Module requires an apiKey option."
    )
  }
  else {
    logger.info("[BLOG MODULE] Validation successful: apiKey provided.")
  }
}