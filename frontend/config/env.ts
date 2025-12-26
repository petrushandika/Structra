/**
 * Environment Configuration
 */

export const env = {
  // API
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Analytics (optional)
  GA_ID: process.env.NEXT_PUBLIC_GA_ID,

  // Sentry (optional)
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Feature Flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
} as const

