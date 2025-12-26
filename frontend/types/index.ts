/**
 * TypeScript Types
 */

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}

// Canonical Schema Types
export interface CanonicalSchema {
  meta: {
    schemaVersion: string
    inputType: string[]
    frameworkTarget: string[]
    confidenceLevel: 'high' | 'medium' | 'low'
  }
  sections: Section[]
  components: Component[]
  layoutStrategy: LayoutStrategy
  backgroundStrategy: BackgroundStrategy
  layering: Layering
  responsiveRules: ResponsiveRule[]
  assumptions: string[]
  ambiguities: Ambiguity[]
}

export interface Section {
  id: string
  name: string
  type: string
  layout: 'grid' | 'flex' | 'block'
  // ... other section properties
}

export interface Component {
  id: string
  name: string
  type: string
  // ... other component properties
}

export interface LayoutStrategy {
  approach: string
  reasoning: string
}

export interface BackgroundStrategy {
  type: string
  // ... background properties
}

export interface Layering {
  zIndex: number
  // ... layering properties
}

export interface ResponsiveRule {
  breakpoint: string
  rules: any
}

export interface Ambiguity {
  type: string
  description: string
  assumption: string
}

// Quality Assessment
export interface QualityAssessment {
  visualConfidence: 'high' | 'medium' | 'low'
  structuralConfidence: 'high' | 'medium' | 'low'
  responsiveRisk: 'low' | 'medium' | 'high'
  maintainabilityRisk: 'low' | 'medium' | 'high'
  manualAdjustmentNeeded: 'none' | 'minor' | 'moderate' | 'major'
  reasoning?: string
}

// Project Types
export interface Project {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
  analyses?: Analysis[]
}

export interface Analysis {
  id: string
  projectId: string
  inputType: string[]
  frameworkTarget: string[]
  schema: CanonicalSchema
  code?: {
    html?: string
    css?: string
    react?: string
  }
  qualityAssessment?: QualityAssessment
  createdAt: string
  updatedAt: string
}

// Collection Types
export interface Collection {
  id: string
  userId: string
  name: string
  description?: string
  tags: string[]
  category?: string
  schema: CanonicalSchema
  code: string
  framework: string
  usageCount: number
  createdAt: string
  updatedAt: string
}

