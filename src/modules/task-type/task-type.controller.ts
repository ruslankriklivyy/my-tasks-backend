import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { PermissionTypes } from '@/modules/permission/enums/permission-types';
import { CheckPermission } from '@/modules/permission/decorators/check-permissions.decorator';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt.guard';

@Controller('task-types')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @SetMetadata('permission', { slug: 'tasks', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Post()
  create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
    return this.taskTypeService.create(createTaskTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.taskTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskTypeService.findOne(+id);
  }

  @SetMetadata('permission', { slug: 'tasks', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskTypeDto: UpdateTaskTypeDto,
  ) {
    return this.taskTypeService.update(+id, updateTaskTypeDto);
  }

  @SetMetadata('permission', { slug: 'tasks', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskTypeService.remove(+id);
  }
}
