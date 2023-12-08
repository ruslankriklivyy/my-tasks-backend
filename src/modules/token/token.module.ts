import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaService } from '@/modules/core/prisma/prisma.service';

@Module({
  providers: [TokenService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
