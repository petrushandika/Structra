/**
 * Validation Middleware
 * Validates request bodies using Zod schemas
 */

import { z } from 'zod'

// Analyze request schema
export const analyzeRequestSchema = z.object({
  image: z.string().min(1, 'Image is required'),
  textualDescription: z.string().optional(),
  frameworkTarget: z.array(z.string()).optional().default(['tailwind']),
  options: z.object({
    includeCode: z.boolean().optional(),
    includeQualityAssessment: z.boolean().optional(),
    designSystem: z.any().optional(),
  }).optional(),
})

export const validateAnalyzeRequest = {
  body: analyzeRequestSchema,
}

// Code generation request schema
export const codeGenerationSchema = z.object({
  schema: z.any(), // Canonical schema
  frameworkTarget: z.array(z.string()).optional().default(['tailwind']),
  options: z.object({
    format: z.string().optional(),
    includeComments: z.boolean().optional(),
  }).optional(),
})

export const validateCodeGeneration = {
  body: codeGenerationSchema,
}

// Schema validation request
export const schemaValidationSchema = z.object({
  schema: z.any(), // Canonical schema
})

export const validateSchemaRequest = {
  body: schemaValidationSchema,
}

