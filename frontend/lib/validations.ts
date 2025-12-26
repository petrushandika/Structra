/**
 * Form Validation Schemas
 */

import { z } from 'zod'
import { FILE_UPLOAD } from '@/constants'

// Analyze form schema
export const analyzeFormSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= FILE_UPLOAD.MAX_SIZE, {
      message: `File size must be less than ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`,
    })
    .refine(
      (file) => FILE_UPLOAD.ACCEPTED_TYPES.includes(file.type as any),
      {
        message: 'File must be PNG or JPEG',
      }
    ),
  textualDescription: z.string().optional(),
  frameworkTarget: z.array(z.string()).min(1, 'Select at least one framework'),
})

// Project form schema
export const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
})

// Collection form schema
export const collectionFormSchema = z.object({
  name: z.string().min(1, 'Collection name is required').max(100),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
})

export type AnalyzeFormData = z.infer<typeof analyzeFormSchema>
export type ProjectFormData = z.infer<typeof projectFormSchema>
export type CollectionFormData = z.infer<typeof collectionFormSchema>

