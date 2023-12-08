import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTaskStatuses() {
  try {
    await prisma.taskStatus.createMany({
      data: [
        {
          name: 'New',
          slug: 'new',
        },
        {
          name: 'In-Progress',
          slug: 'in-progress',
        },
        {
          name: 'Done',
          slug: 'done',
        },
        {
          name: 'Canceled',
          slug: 'canceled',
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
