import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2d",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      compression: {
        enabled: true,
        level: 6,
        memLevel: 8,
        threshold: 1024,
      },
      authMethodsPerActor: {
        user: ["emailpass"],
        customer: ["emailpass", "google"],
      }
    },
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable"
    },
    cookieOptions: {
      sameSite: 'lax'
    },
    databaseLogging: true
  },
  modules: [
    {
      resolve: "./src/modules/brand"
    },
    {
      resolve: "./src/modules/cms",
      options: {
        apiKey: process.env.CMS_API_KEY
      }
    },
    {
      resolve: "./src/modules/product-review",
    }
  ],
  plugins: [
    {
      resolve: "@medusa-plugin-wishlist",
      options: {}
    }
  ]
})