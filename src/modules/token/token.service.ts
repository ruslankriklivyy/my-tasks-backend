import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@/modules/core/prisma/prisma.service';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(user: any) {
    const payload = { ...user, id: user.id };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async generateTokensFromGoogle(payload: CreateUserDto) {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRE'),
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.prismaService.token.findUnique({
      where: { user_id: userId },
    });

    if (tokenData) {
      return this.prismaService.token.update({
        where: { id: tokenData.id },
        data: { refresh_token: refreshToken },
      });
    }

    return this.prismaService.token.create({
      data: { user_id: userId, refresh_token: refreshToken },
      include: { user: true },
    });
  }

  removeToken(userId: number) {
    return this.prismaService.token.delete({ where: { user_id: userId } });
  }

  findRefreshToken(refreshToken: string) {
    return this.prismaService.token.findUnique({
      where: { refresh_token: refreshToken },
    });
  }

  validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      return null;
    }
  }
}
