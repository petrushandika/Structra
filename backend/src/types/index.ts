/**
 * TypeScript Types
 */

// User Types
export interface User {
  id: string
  email: string
  name: string | null
  role: 'USER' | 'ADMIN'
  plan?: 'free' | 'pro' | 'enterprise'
}

// Request Context
export interface RequestContext {
  user?: User
  ip?: string
  userAgent?: string
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
  sort?: 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}

// Canonical Schema (shared with frontend)
export interface CanonicalSchema {
  meta: {
    schemaVersion: string
    inputType: string[]
    frameworkTarget: string[]
    confidenceLevel: 'high' | 'medium' | 'low'
  }
  sections: any[]
  components: any[]
  layoutStrategy: any
  backgroundStrategy: any
  layering: any
  responsiveRules: any[]
  assumptions: string[]
  ambiguities: any[]
}

// Analysis Request
export interface AnalyzeRequest {
  image: string // base64 or URL
  textualDescription?: string
  frameworkTarget?: string[]
  options?: {
    includeCode?: boolean
    includeQualityAssessment?: boolean
    designSystem?: any
  }
}

// Code Generation Request
export interface CodeGenerationRequest {
  schema: CanonicalSchema
  frameworkTarget?: string[]
  options?: {
    format?: string
    includeComments?: boolean
  }
}

