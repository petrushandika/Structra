/**
 * Authentication Middleware
 * Validates API key and attaches user to request
 */

import { Elysia } from 'elysia'
import { verifyApiKey } from '../services/auth.service'

export const authenticate = new Elysia()
  .derive(async ({ headers }) => {
    const authHeader = headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        user: null,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing or invalid authorization header',
        },
      }
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    try {
      const user = await verifyApiKey(token)

      if (!user) {
        return {
          user: null,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid API key',
          },
        }
      }

      return {
        user,
        error: null,
      }
    } catch (error) {
      return {
        user: null,
        error: {
          code: 'AUTH_ERROR',
          message: error instanceof Error ? error.message : 'Authentication failed',
        },
      }
    }
  })
  .onBeforeHandle(({ user, error }) => {
    if (!user || error) {
      return {
        success: false,
        error: error || {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      }
    }
  })

