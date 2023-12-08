import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckPermission } from '@/modules/permission/decorators/check-permissions.decorator';
import { PermissionTypes } from '@/modules/permission/enums/permission-types';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SetMetadata('permission', { slug: 'users', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SetMetadata('permission', { slug: 'users', type: PermissionTypes.Viewed })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @SetMetadata('permission', { slug: 'users', type: PermissionTypes.Viewed })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneWithRole({ id: Number(id) });
  }

  @SetMetadata('permission', { slug: 'users', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @SetMetadata('permission', { slug: 'users', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
