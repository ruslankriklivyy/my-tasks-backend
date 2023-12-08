import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from '@/modules/core/prisma/prisma.service';
import { RolePermissionModule } from '@/modules/role-permission/role-permission.module';

@Module({
  imports: [RolePermissionModule],
  controllers: [RoleController],
  providers: [RoleService, PrismaService],
  exports: [RoleService],
})
export class RoleModule {}
