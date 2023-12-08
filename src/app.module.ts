import { Module } from '@nestjs/common';
import { RoleModule } from '@/modules/role/role.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import { RolePermissionModule } from '@/modules/role-permission/role-permission.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { TokenModule } from '@/modules/token/token.module';
import { TaskModule } from '@/modules/task/task.module';
import { TaskTypeModule } from '@/modules/task-type/task-type.module';
import { TaskStatusModule } from '@/modules/task-status/task-status.module';
import { FileModule } from '@/modules/file/file.module';
import { NotificationModule } from '@/modules/notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtConfig } from '@/modules/auth/auth-jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({ global: true, useClass: AuthJwtConfig }),
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    AuthModule,
    UserModule,
    TokenModule,
    TaskModule,
    TaskTypeModule,
    TaskStatusModule,
    FileModule,
    NotificationModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
