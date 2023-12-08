import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  try {
    const password = await bcrypt.hash('12345678', 5);

    await prisma.user.createMany({
      data: [
        {
          email: 'admin@example.com',
          full_name: 'admin',
          role_id: 1,
          password,
        },
        {
          email: 'user@example.com',
          full_name: 'user',
          role_id: 2,
          password,
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
