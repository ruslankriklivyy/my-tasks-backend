import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { PrismaService } from '@/modules/core/prisma/prisma.service';
import { MulterConfigService } from '@/modules/file/multer/multer-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService, PrismaService],
  exports: [FileService],
})
export class FileModule {}
