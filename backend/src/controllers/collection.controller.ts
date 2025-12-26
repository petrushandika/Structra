/**
 * Collection Controller
 * Handles collection management requests
 */

import { Elysia } from 'elysia'
import { collectionService } from '../services/collection.service'
import { authenticate } from '../middleware/auth.middleware'

export const collectionController = new Elysia({ prefix: '/collections' })
  .use(authenticate)
  .get('/', async ({ user, query }) => {
    try {
      const collections = await collectionService.getCollections({
        userId: user.id,
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 20,
        tags: query.tags ? (query.tags as string).split(',') : undefined,
        category: query.category as string,
        framework: query.framework as string,
      })

      return {
        success: true,
        data: collections,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'COLLECTIONS_FETCH_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch collections',
        },
      }
    }
  })
  .get('/:id', async ({ params, user }) => {
    try {
      const collection = await collectionService.getCollectionById(params.id, user.id)

      if (!collection) {
        return {
          success: false,
          error: {
            code: 'COLLECTION_NOT_FOUND',
            message: 'Collection not found',
          },
        }
      }

      return {
        success: true,
        data: collection,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'COLLECTION_FETCH_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch collection',
        },
      }
    }
  })
  .post('/', async ({ body, user }) => {
    try {
      const collection = await collectionService.createCollection({
        name: body.name,
        description: body.description,
        tags: body.tags || [],
        category: body.category,
        schema: body.schema,
        code: body.code,
        framework: body.framework,
        userId: user.id,
      })

      return {
        success: true,
        data: collection,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'COLLECTION_CREATE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to create collection',
        },
      }
    }
  })
  .put('/:id', async ({ params, body, user }) => {
    try {
      const collection = await collectionService.updateCollection(params.id, {
        name: body.name,
        description: body.description,
        tags: body.tags,
        category: body.category,
        schema: body.schema,
        userId: user.id,
      })

      return {
        success: true,
        data: collection,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'COLLECTION_UPDATE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to update collection',
        },
      }
    }
  })
  .delete('/:id', async ({ params, user }) => {
    try {
      await collectionService.deleteCollection(params.id, user.id)

      return {
        success: true,
        message: 'Collection deleted',
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'COLLECTION_DELETE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to delete collection',
        },
      }
    }
  })

