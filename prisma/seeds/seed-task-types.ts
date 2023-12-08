import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTaskTypes() {
  try {
    await prisma.taskType.createMany({
      data: [
        {
          name: 'Important',
          slug: 'important',
        },
        {
          name: 'Regular',
          slug: 'regular',
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
