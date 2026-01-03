import {
  LoaderOptions,
} from "@medusajs/framework/types"

export default async function brandLoader({
  container,
}: LoaderOptions) {
  const logger = container.resolve("logger")

  logger.info("[BRAND MODULE] Just started the Medusa application!")
}