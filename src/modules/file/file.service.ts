import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as fs from 'fs/promises';

import { PrismaService } from '@/modules/core/prisma/prisma.service';
import { FileEntityTypeEnum } from '@/modules/file/enums/file-entity-type.enum';

@Injectable()
export class FileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  createOne(file: Express.Multer.File) {
    const filePath = this.configService.get<string>('UPLOAD_DEST').slice(2);
    return this.prismaService.file.create({
      data: {
        file_name: file.filename,
        size: file.size,
        type: file.mimetype,
        url: `${filePath}/${file.filename}`,
      },
    });
  }

  createMany(files: Express.Multer.File[]) {
    const newFiles: Prisma.FileCreateInput[] = [];
    const filePath = this.configService.get<string>('UPLOAD_DEST').slice(2);

    for (const file of files) {
      newFiles.push({
        file_name: file.filename,
        size: file.size,
        type: file.mimetype,
        url: `${filePath}/${file.filename}`,
      });
    }

    return this.prismaService.file.createMany({
      data: newFiles,
      skipDuplicates: true,
    });
  }

  async deleteOne(fileId: number) {
    const file = await this.prismaService.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'File not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await fs.unlink(file?.url);
    return this.prismaService.file.delete({ where: { id: fileId } });
  }

  deleteMany(filesIds: number[]) {
    return this.prismaService.file.deleteMany({
      where: { id: { in: filesIds } },
    });
  }

  async attach(
    fileId: number,
    entityId: number,
    entityType: FileEntityTypeEnum,
  ) {
    switch (entityType) {
      case FileEntityTypeEnum.User:
        await this.prismaService.file.update({
          where: { id: fileId },
          data: { user: { connect: { id: entityId } } },
        });
        break;
      default:
        return null;
    }
  }

  async attachMany(
    filesIds: number[],
    entityId: number,
    entityType: FileEntityTypeEnum,
  ) {
    try {
      const files = await this.prismaService.file.findMany({
        where: { id: { in: filesIds } },
      });

      for (const file of files) {
        switch (entityType) {
          case FileEntityTypeEnum.User:
            await this.prismaService.file.update({
              where: { id: file.id },
              data: { user: { connect: { id: entityId } } },
            });
            break;
          default:
            return;
        }
      }

      return 'Success attached';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
