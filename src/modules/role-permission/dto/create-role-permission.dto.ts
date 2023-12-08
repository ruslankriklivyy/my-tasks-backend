import { IsEnum, IsNumber } from 'class-validator';
import { PermissionTypes } from '@/modules/permission/enums/permission-types';

export class CreateRolePermissionDto {
  @IsNumber()
  role_id: number;

  @IsNumber()
  permission_id: number;

  @IsEnum(PermissionTypes)
  type: PermissionTypes;
}
