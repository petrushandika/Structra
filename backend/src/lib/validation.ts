/**
 * Validation Utilities
 */

import { z } from 'zod'
import { FILE_UPLOAD } from '../constants'

// Image validation schema
export const imageSchema = z
  .string()
  .min(1, 'Image is required')
  .refine(
    (val) => {
      // Check if it's a base64 string or URL
      if (val.startsWith('data:image/')) {
        const base64 = val.split(',')[1]
        const size = (base64.length * 3) / 4 - (base64.match(/=/g)?.length || 0)
        return size <= FILE_UPLOAD.MAX_SIZE
      }
      if (val.startsWith('http://') || val.startsWith('https://')) {
        return true
      }
      return false
    },
    {
      message: `Image must be base64 or URL and less than ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`,
    }
  )

// Analyze request schema
export const analyzeRequestSchema = z.object({
  image: imageSchema,
  textualDescription: z.string().optional(),
  frameworkTarget: z.array(z.string()).optional().default(['tailwind']),
  options: z
    .object({
      includeCode: z.boolean().optional(),
      includeQualityAssessment: z.boolean().optional(),
      designSystem: z.any().optional(),
    })
    .optional(),
})

// Code generation request schema
export const codeGenerationSchema = z.object({
  schema: z.any(), // Canonical schema
  frameworkTarget: z.array(z.string()).optional().default(['tailwind']),
  options: z
    .object({
      format: z.string().optional(),
      includeComments: z.boolean().optional(),
    })
    .optional(),
})

// Project creation schema
export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name too long'),
})

// Collection creation schema
export const collectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required').max(100),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  category: z.string().optional(),
  schema: z.any(),
  code: z.string().min(1, 'Code is required'),
  framework: z.string().min(1, 'Framework is required'),
})

