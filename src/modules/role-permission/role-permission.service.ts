import { Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { PrismaService } from '@/modules/core/prisma/prisma.service';

@Injectable()
export class RolePermissionService {
  constructor(private readonly prismaService: PrismaService) {}

  getOneByRole(roleId: number, permissionId: number) {
    return this.prismaService.rolePermission.findFirst({
      where: { role_id: roleId, permission_id: permissionId },
      include: { role: true, permission: true },
    });
  }

  createOne(roleId: number, permission: CreateRolePermissionDto) {
    return this.prismaService.rolePermission.create({
      data: {
        role_id: roleId,
        permission_id: permission.permission_id,
        type: permission.type,
      },
      include: { role: true, permission: true },
    });
  }

  createMany(permissions: CreateRolePermissionDto[]) {
    return this.prismaService.rolePermission.createMany({
      data: permissions,
      skipDuplicates: true,
    });
  }

  updateOne(id: number, permission: UpdateRolePermissionDto) {
    return this.prismaService.rolePermission.update({
      where: {
        id,
        role_id: permission.role_id,
        permission_id: permission.permission_id,
      },
      data: { type: permission.type },
      include: { role: true, permission: true },
    });
  }

  deleteOne(id: number) {
    return this.prismaService.rolePermission.delete({ where: { id } });
  }
}
