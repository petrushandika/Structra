/**
 * Prisma Seed Script
 * Run with: bunx prisma db seed
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Example: Create a test user
  // const user = await prisma.user.create({
  //   data: {
  //     email: 'test@structra.com',
  //     name: 'Test User',
  //     role: 'USER',
  //   },
  // })

  // console.log('✅ Created user:', user.email)

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

