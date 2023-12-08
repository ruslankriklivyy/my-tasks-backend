import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoles() {
  try {
    await prisma.role.createMany({
      data: [
        {
          name: 'Admin',
          slug: 'admin',
        },
        {
          name: 'User',
          slug: 'user',
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
