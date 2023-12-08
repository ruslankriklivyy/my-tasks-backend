import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';

import { FileService } from './file.service';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt.guard';
import { MAX_FILE_SIZE_KB } from '@/consts/MAX_FILE_SIZE_KB';
import { ALLOWED_FILE_EXTENSIONS } from '@/consts/ALLOWED_FILE_EXTENSIONS';
import { uploadOptions } from '@/modules/file/upload-options';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':filename')
  async getOne(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileType = filename.split('.').pop();
    let contentType = 'text/plain';

    res.set({
      'Content-Type': contentType,
    });

    switch (fileType) {
      case 'svg':
        contentType = 'image/svg+xml';
        break;
      case 'html':
        contentType = 'text/html';
        break;
      default:
        contentType = `image/${fileType}`;
        break;
    }

    const filePath = join(
      process.cwd(),
      `${this.configService.get<string>('UPLOAD_DEST').slice(2)}/${filename}`,
    );

    const readStream = createReadStream(filePath);
    readStream.on('error', (err) => {
      console.error(err);
    });

    return new StreamableFile(readStream);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  createOne(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_KB }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_EXTENSIONS }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.createOne(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOne(@Param() { id }) {
    return this.fileService.deleteOne(id);
  }
}
