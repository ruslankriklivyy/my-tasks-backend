import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthJwtConfig implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRE'),
      },
    };
  }
}
