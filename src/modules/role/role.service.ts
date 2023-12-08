import { Injectable } from '@nestjs/common';
import { difference } from 'lodash';
import { Prisma } from '@prisma/client';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '@/modules/core/prisma/prisma.service';
import { RolePermissionService } from '@/modules/role-permission/role-permission.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  findAll() {
    return this.prismaService.role.findMany({
      include: { permissions: { include: { permission: true } } },
    });
  }

  findOne(where?: Prisma.RoleWhereUniqueInput) {
    return this.prismaService.role.findUnique({ where });
  }

  async create(createRoleDto: CreateRoleDto) {
    const { permissions, ...roleDto } = createRoleDto;
    const newRole = await this.prismaService.role.create({ data: roleDto });
    await this.rolePermissionService.createMany(permissions);
    return newRole;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissions, ...updatedRole } = updateRoleDto;
    const role = await this.prismaService.role.findUnique({
      where: {
        id,
      },
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });
    const rolePermissionsIds = role.permissions.map(
      ({ permission }) => permission.id,
    );
    const permissionsIdsDifference = difference(
      rolePermissionsIds,
      permissions.map(({ permission_id }) => permission_id),
    );

    if (permissionsIdsDifference?.length) {
      for (const permissionId of permissionsIdsDifference) {
        const rolePermission = await this.rolePermissionService.getOneByRole(
          id,
          permissionId,
        );

        if (rolePermission) {
          await this.rolePermissionService.deleteOne(rolePermission.id);
        }
      }
    }

    if (permissions?.length) {
      for (const permission of permissions) {
        if (!permissionsIdsDifference.includes(permission.permission_id)) {
          await this.rolePermissionService.updateOne(id, permission);
        }

        if (!rolePermissionsIds.includes(permission.permission_id)) {
          await this.rolePermissionService.createOne(id, permission);
        }
      }
    }

    return this.prismaService.role.update({ where: { id }, data: updatedRole });
  }

  remove(id: number) {
    return this.prismaService.role.delete({ where: { id } });
  }
}
