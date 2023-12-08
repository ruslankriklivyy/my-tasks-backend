import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPermissions() {
  try {
    await prisma.permission.createMany({
      data: [
        {
          name: 'Users',
          slug: 'users',
        },
        {
          name: 'Tasks',
          slug: 'tasks',
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
