/**
 * Project Controller
 * Handles project management requests
 */

import { Elysia } from 'elysia'
import { projectService } from '../services/project.service'
import { authenticate } from '../middleware/auth.middleware'

export const projectController = new Elysia({ prefix: '/projects' })
  .use(authenticate)
  .get('/', async ({ user, query }) => {
    try {
      const projects = await projectService.getProjects({
        userId: user.id,
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 20,
        sort: query.sort as 'createdAt' | 'updatedAt' || 'updatedAt',
      })

      return {
        success: true,
        data: projects,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROJECTS_FETCH_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch projects',
        },
      }
    }
  })
  .get('/:id', async ({ params, user }) => {
    try {
      const project = await projectService.getProjectById(params.id, user.id)

      if (!project) {
        return {
          success: false,
          error: {
            code: 'PROJECT_NOT_FOUND',
            message: 'Project not found',
          },
        }
      }

      return {
        success: true,
        data: project,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROJECT_FETCH_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch project',
        },
      }
    }
  })
  .post('/', async ({ body, user }) => {
    try {
      const project = await projectService.createProject({
        name: body.name,
        userId: user.id,
      })

      return {
        success: true,
        data: project,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROJECT_CREATE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to create project',
        },
      }
    }
  })
  .put('/:id', async ({ params, body, user }) => {
    try {
      const project = await projectService.updateProject(params.id, {
        name: body.name,
        userId: user.id,
      })

      return {
        success: true,
        data: project,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROJECT_UPDATE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to update project',
        },
      }
    }
  })
  .delete('/:id', async ({ params, user }) => {
    try {
      await projectService.deleteProject(params.id, user.id)

      return {
        success: true,
        message: 'Project deleted',
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'PROJECT_DELETE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to delete project',
        },
      }
    }
  })

