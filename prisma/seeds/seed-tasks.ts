import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTasks() {
  try {
    await prisma.task.createMany({
      data: [
        {
          name: 'Test 1',
          author_id: 2,
          color: '#fcba03',
          description: 'Some description for Test 1',
          type_id: 1,
          status_id: 1,
          start_date: new Date(),
          end_date: new Date(new Date().getDate() + 2),
        },
        {
          name: 'Test 2',
          author_id: 2,
          color: '#fcba03',
          description: 'Some description for Test 2',
          type_id: 1,
          status_id: 2,
          start_date: new Date(),
          end_date: new Date(new Date().getDate() + 1),
        },
        {
          name: 'Test 3',
          author_id: 2,
          color: '#fcba03',
          description: 'Some description for Test 3',
          type_id: 2,
          status_id: 1,
          start_date: new Date(),
          end_date: new Date(new Date().getDate() + 5),
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
