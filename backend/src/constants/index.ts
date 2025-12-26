/**
 * Backend Constants
 */

// API Configuration
export const API_CONFIG = {
  VERSION: '1.0.0',
  PREFIX: '/api/v1',
} as const

// Rate Limiting
export const RATE_LIMITS = {
  FREE: 100, // requests per hour
  PRO: 1000,
  ENTERPRISE: 10000,
  WINDOW: 3600, // 1 hour in seconds
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: ['image/png', 'image/jpeg', 'image/jpg'],
  ALLOWED_EXTENSIONS: ['.png', '.jpg', '.jpeg'],
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

// Cache TTL (Time To Live)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const

// AI Configuration
export const AI_CONFIG = {
  GEMINI_MODEL: 'gemini-pro-vision',
  OLLAMA_MODEL: 'mistral',
  MAX_TOKENS: 4000,
  TEMPERATURE: 0.7,
} as const

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  AI_SERVICE_ERROR: 'AI_SERVICE_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const

