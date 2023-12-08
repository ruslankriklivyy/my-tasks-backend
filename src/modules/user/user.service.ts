import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/modules/core/prisma/prisma.service';
import { FileService } from '@/modules/file/file.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      include: { role: true, avatar: true },
      data: createUserDto,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({ where });
  }

  findOneWithRole(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
