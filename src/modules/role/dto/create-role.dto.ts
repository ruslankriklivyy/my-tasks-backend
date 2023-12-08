import { IsArray, IsString } from 'class-validator';
import { CreateRolePermissionDto } from '@/modules/role-permission/dto/create-role-permission.dto';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsArray()
  permissions: CreateRolePermissionDto[];
}
