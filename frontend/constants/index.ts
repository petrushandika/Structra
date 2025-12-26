/**
 * Application Constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  TIMEOUT: 30000, // 30 seconds
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  ANALYZE: '/analyze',
  PROJECTS: '/projects',
  COLLECTIONS: '/collections',
  SETTINGS: '/settings',
} as const

// Framework Options
export const FRAMEWORKS = [
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'bootstrap', label: 'Bootstrap' },
  { value: 'css', label: 'CSS Manual' },
  { value: 'scss', label: 'SCSS' },
  { value: 'css-modules', label: 'CSS Modules' },
  { value: 'postcss', label: 'PostCSS' },
] as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: ['image/png', 'image/jpeg', 'image/jpg'],
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

