/**
 * Error Handling Utilities
 */

import { ERROR_CODES } from '../constants'
import { logger } from './logger'

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(ERROR_CODES.VALIDATION_ERROR, message, 400, details)
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(ERROR_CODES.UNAUTHORIZED, message, 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(ERROR_CODES.FORBIDDEN, message, 403)
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(ERROR_CODES.NOT_FOUND, message, 404)
    this.name = 'NotFoundError'
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(ERROR_CODES.RATE_LIMIT_EXCEEDED, message, 429)
    this.name = 'RateLimitError'
  }
}

export function handleError(error: unknown): { code: string; message: string; statusCode: number } {
  if (error instanceof AppError) {
    logger.error({ code: error.code, message: error.message, details: error.details }, 'AppError')
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    logger.error(error, 'Unexpected error')
    return {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: error.message || 'Internal server error',
      statusCode: 500,
    }
  }

  logger.error({ error }, 'Unknown error')
  return {
    code: ERROR_CODES.INTERNAL_ERROR,
    message: 'Internal server error',
    statusCode: 500,
  }
}

