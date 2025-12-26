/**
 * Application Configuration
 */

export const config = {
  // Application
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 8000,
  APP_URL: process.env.APP_URL || 'http://localhost:8000',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // Redis
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',

  // AI Services
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OLLAMA_URL: process.env.OLLAMA_URL || 'http://localhost:11434',

  // Storage
  S3_ENDPOINT: process.env.S3_ENDPOINT || 'http://localhost:9000',
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || '',
  S3_SECRET_KEY: process.env.S3_SECRET_KEY || '',
  S3_BUCKET: process.env.S3_BUCKET || 'structra-images',
  S3_REGION: process.env.S3_REGION || 'us-east-1',
  S3_USE_SSL: process.env.S3_USE_SSL === 'true',

  // Qdrant
  QDRANT_URL: process.env.QDRANT_URL || 'http://localhost:6333',

  // Security
  JWT_SECRET: process.env.JWT_SECRET || '',
  API_KEY_SECRET: process.env.API_KEY_SECRET || '',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
} as const

// Validate required environment variables
export function validateConfig() {
  const required = [
    'DATABASE_URL',
    'REDIS_URL',
    'GEMINI_API_KEY',
    'JWT_SECRET',
  ]

  const missing = required.filter((key) => !config[key as keyof typeof config])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

