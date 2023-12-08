import { Module } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TaskStatusController],
  providers: [TaskStatusService],
})
export class TaskStatusModule {}
