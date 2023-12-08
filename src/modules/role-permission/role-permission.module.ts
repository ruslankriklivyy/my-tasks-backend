import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { PrismaService } from '@/modules/core/prisma/prisma.service';

@Module({
  providers: [RolePermissionService, PrismaService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
