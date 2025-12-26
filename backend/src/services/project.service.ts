/**
 * Project Service
 * Business logic for project management
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const projectService = {
  async getProjects(params: {
    userId: string
    page: number
    limit: number
    sort: 'createdAt' | 'updatedAt'
  }) {
    const skip = (params.page - 1) * params.limit

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { userId: params.userId },
        skip,
        take: params.limit,
        orderBy: { [params.sort]: 'desc' },
        include: {
          _count: {
            select: { analyses: true },
          },
        },
      }),
      prisma.project.count({
        where: { userId: params.userId },
      }),
    ])

    return {
      projects,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    }
  },

  async getProjectById(projectId: string, userId: string) {
    return prisma.project.findFirst({
      where: {
        id: projectId,
        userId,
      },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })
  },

  async createProject(params: { name: string; userId: string }) {
    return prisma.project.create({
      data: {
        name: params.name,
        userId: params.userId,
      },
    })
  },

  async updateProject(projectId: string, params: { name?: string; userId: string }) {
    return prisma.project.update({
      where: {
        id: projectId,
        userId: params.userId,
      },
      data: {
        name: params.name,
      },
    })
  },

  async deleteProject(projectId: string, userId: string) {
    return prisma.project.delete({
      where: {
        id: projectId,
        userId,
      },
    })
  },
}

