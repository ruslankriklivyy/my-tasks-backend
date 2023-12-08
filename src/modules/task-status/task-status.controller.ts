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

import { TaskStatusService } from './task-status.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { PermissionTypes } from '@/modules/permission/enums/permission-types';
import { CheckPermission } from '@/modules/permission/decorators/check-permissions.decorator';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt.guard';

@Controller('task-statuses')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @SetMetadata('permission', { slug: 'tasks', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Post()
  create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    return this.taskStatusService.create(createTaskStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.taskStatusService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskStatusService.findOne(+id);
  }

  @SetMetadata('permission', { slug: 'tasks', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskStatusService.update(+id, updateTaskStatusDto);
  }

  @SetMetadata('permission', { slug: 'tasks', type: PermissionTypes.Editable })
  @UseGuards(JwtAuthGuard, CheckPermission)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskStatusService.remove(+id);
  }
}
