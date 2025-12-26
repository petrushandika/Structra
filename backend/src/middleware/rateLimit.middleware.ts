/**
 * Rate Limiting Middleware
 * Limits requests per user/IP
 */

import { Elysia } from 'elysia'
import { redis } from '../utils/redis'

const RATE_LIMIT_WINDOW = 3600 // 1 hour in seconds
const RATE_LIMITS = {
  free: 100,
  pro: 1000,
  enterprise: 10000,
}

export const rateLimit = new Elysia()
  .derive(async ({ user, ip }) => {
    if (!user) {
      return { rateLimit: null }
    }

    const key = `rate_limit:${user.id}`
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW)
    }

    const limit = RATE_LIMITS[user.plan || 'free'] || RATE_LIMITS.free

    return {
      rateLimit: {
        limit,
        remaining: Math.max(0, limit - current),
        reset: Date.now() + RATE_LIMIT_WINDOW * 1000,
      },
    }
  })
  .onBeforeHandle(({ rateLimit }) => {
    if (rateLimit && rateLimit.remaining <= 0) {
      return {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Rate limit exceeded. Please try again later.',
        },
      }
    }
  })
  .onAfterHandle(({ set, rateLimit }) => {
    if (rateLimit) {
      set.headers['X-RateLimit-Limit'] = rateLimit.limit.toString()
      set.headers['X-RateLimit-Remaining'] = rateLimit.remaining.toString()
      set.headers['X-RateLimit-Reset'] = rateLimit.reset.toString()
    }
  })

