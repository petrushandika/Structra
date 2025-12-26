/**
 * Collection Service
 * Business logic for collection management
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const collectionService = {
  async getCollections(params: {
    userId: string
    page: number
    limit: number
    tags?: string[]
    category?: string
    framework?: string
  }) {
    const skip = (params.page - 1) * params.limit

    const where: any = {
      userId: params.userId,
    }

    if (params.tags && params.tags.length > 0) {
      where.tags = {
        hasSome: params.tags,
      }
    }

    if (params.category) {
      where.category = params.category
    }

    if (params.framework) {
      where.framework = params.framework
    }

    const [collections, total] = await Promise.all([
      prisma.collection.findMany({
        where,
        skip,
        take: params.limit,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.collection.count({ where }),
    ])

    return {
      collections,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    }
  },

  async getCollectionById(collectionId: string, userId: string) {
    return prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId,
      },
    })
  },

  async createCollection(params: {
    name: string
    description?: string
    tags: string[]
    category?: string
    schema: any
    code: string
    framework: string
    userId: string
  }) {
    return prisma.collection.create({
      data: {
        name: params.name,
        description: params.description,
        tags: params.tags,
        category: params.category,
        schema: params.schema,
        code: params.code,
        framework: params.framework,
        userId: params.userId,
      },
    })
  },

  async updateCollection(collectionId: string, params: {
    name?: string
    description?: string
    tags?: string[]
    category?: string
    schema?: any
    userId: string
  }) {
    return prisma.collection.update({
      where: {
        id: collectionId,
        userId: params.userId,
      },
      data: {
        name: params.name,
        description: params.description,
        tags: params.tags,
        category: params.category,
        schema: params.schema,
      },
    })
  },

  async deleteCollection(collectionId: string, userId: string) {
    return prisma.collection.delete({
      where: {
        id: collectionId,
        userId,
      },
    })
  },
}

