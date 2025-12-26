/**
 * Analyze Controller
 * Handles design analysis requests
 */

import { Elysia } from 'elysia'
import { analyzeService } from '../services/analyze.service'
import { authenticate } from '../middleware/auth.middleware'
import { validateAnalyzeRequest } from '../middleware/validation.middleware'

export const analyzeController = new Elysia({ prefix: '/analyze' })
  .use(authenticate)
  .post(
    '/',
    async ({ body, user }) => {
      try {
        const result = await analyzeService.analyzeDesign({
          image: body.image,
          textualDescription: body.textualDescription,
          frameworkTarget: body.frameworkTarget || ['tailwind'],
          options: body.options,
          userId: user.id,
        })

        return {
          success: true,
          data: result,
        }
      } catch (error) {
        return {
          success: false,
          error: {
            code: 'ANALYSIS_ERROR',
            message: error instanceof Error ? error.message : 'Analysis failed',
          },
        }
      }
    },
    {
      body: validateAnalyzeRequest,
    }
  )

