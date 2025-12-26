/**
 * Code Generation Controller
 * Handles code generation from canonical schema
 */

import { Elysia } from 'elysia'
import { codeService } from '../services/code.service'
import { authenticate } from '../middleware/auth.middleware'

export const codeController = new Elysia({ prefix: '/code' })
  .use(authenticate)
  .post('/generate', async ({ body, user }) => {
    try {
      const result = await codeService.generateCode({
        schema: body.schema,
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
          code: 'CODE_GENERATION_ERROR',
          message: error instanceof Error ? error.message : 'Code generation failed',
        },
      }
    }
  })
  .post('/validate-schema', async ({ body }) => {
    try {
      const result = await codeService.validateSchema(body.schema)

      return {
        success: true,
        data: result,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error instanceof Error ? error.message : 'Schema validation failed',
        },
      }
    }
  })

