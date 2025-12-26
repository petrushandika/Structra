/**
 * Authentication Service
 * Handles API key verification and user authentication
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export interface User {
  id: string
  email: string
  name: string | null
  role: string
  plan?: 'free' | 'pro' | 'enterprise'
}

/**
 * Verify API key and return user
 */
export async function verifyApiKey(apiKey: string): Promise<User | null> {
  try {
    // Hash the provided API key to compare with stored hash
    // In production, you should hash the API key when storing it
    const apiKeyRecord = await prisma.apiKey.findFirst({
      where: {
        keyHash: apiKey, // In production, use bcrypt.compare
      },
      include: {
        user: true,
      },
    })

    if (!apiKeyRecord) {
      return null
    }

    // Check if API key is expired
    if (apiKeyRecord.expiresAt && apiKeyRecord.expiresAt < new Date()) {
      return null
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: apiKeyRecord.id },
      data: { lastUsed: new Date() },
    })

    return {
      id: apiKeyRecord.user.id,
      email: apiKeyRecord.user.email,
      name: apiKeyRecord.user.name,
      role: apiKeyRecord.user.role,
      plan: 'free', // TODO: Get from user subscription
    }
  } catch (error) {
    console.error('Error verifying API key:', error)
    return null
  }
}

