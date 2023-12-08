import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/modules/user/user.module';
import { TokenModule } from '@/modules/token/token.module';
import { RoleModule } from '@/modules/role/role.module';
import { HttpService } from '@/modules/core/http/http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: HttpService }),
    UserModule,
    TokenModule,
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpService],
})
export class AuthModule {}
