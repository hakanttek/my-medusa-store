import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container } from "@medusajs/ui"
import { TagSolid } from "@medusajs/icons"

const BrandPage = () => {
  // TODO retrieve brands

  return (
    <Container className="divide-y p-0">
      {/* TODO show brands */}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid
})

export default BrandPage;