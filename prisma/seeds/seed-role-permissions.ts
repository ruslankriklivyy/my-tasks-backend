import { PrismaClient } from '@prisma/client';
import { PermissionTypes } from '../../src/modules/permission/enums/permission-types';

const prisma = new PrismaClient();

export async function seedRolePermissions() {
  try {
    await prisma.rolePermission.createMany({
      data: [
        {
          role_id: 1,
          permission_id: 1,
          type: PermissionTypes.Editable,
        },
        {
          role_id: 1,
          permission_id: 2,
          type: PermissionTypes.Editable,
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
