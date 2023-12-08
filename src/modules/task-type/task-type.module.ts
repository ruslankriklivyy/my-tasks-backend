import { Module } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { TaskTypeController } from './task-type.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
})
export class TaskTypeModule {}
