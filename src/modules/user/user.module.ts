import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@/modules/core/prisma/prisma.service';
import { FileModule } from '@/modules/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
