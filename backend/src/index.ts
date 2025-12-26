/**
 * Structra Backend - Main Entry Point
 * Elysia.js API Server
 */

import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { config, validateConfig } from './config'
import { logger } from './lib/logger'
import {
  analyzeController,
  codeController,
  projectController,
  collectionController,
} from './controllers'

// Validate configuration on startup
try {
  validateConfig()
} catch (error) {
  logger.error(error, 'Configuration validation failed')
  process.exit(1)
}

const app = new Elysia()
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: 'Structra API',
        version: '1.0.0',
        description: 'AI-powered UI Structure Engineering Engine API',
      },
      tags: [
        { name: 'health', description: 'Health check endpoints' },
        { name: 'analyze', description: 'Design analysis endpoints' },
        { name: 'code', description: 'Code generation endpoints' },
        { name: 'projects', description: 'Project management endpoints' },
        { name: 'collections', description: 'Collection management endpoints' },
      ],
    },
  }))
  // Public routes
  .get('/', () => ({
    message: 'Structra API',
    version: '1.0.0',
    docs: '/swagger',
  }))
  .get('/health', async () => {
    // TODO: Add health checks for database, redis, etc.
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        redis: 'connected',
        ai: 'ready',
      },
    }
  })
  // API routes with controllers
  .use(analyzeController)
  .use(codeController)
  .use(projectController)
  .use(collectionController)
  .listen(config.PORT)

logger.info(
  `🦊 Structra Backend is running at http://${app.server?.hostname}:${app.server?.port}`
)
logger.info(
  `📚 API Documentation: http://${app.server?.hostname}:${app.server?.port}/swagger`
)

export type App = typeof app

