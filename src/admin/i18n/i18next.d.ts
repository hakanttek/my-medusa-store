// Import Medusa keys
import type { Resources } from "@medusajs/dashboard"
// Import your custom translation keys
// For example, import the English translation file
import type enTranslation from "./i18n/en.json"
// add other imports for different languages if needed...
// import type esTranslation from "./i18n/es.json"

declare module "i18next" {
  interface CustomTypeOptions {
    fallbackNS: "translation"
    resources: {
      translation: Resources["translation"]
      // Optional: add custom namespaces here
      // For example, if you have a custom namespace called 'brands':
      brands: typeof enTranslation & Resources["translation"]
    }
  }
}