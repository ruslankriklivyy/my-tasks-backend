import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions() {
    return {
      dest: this.configService.get('UPLOAD_DEST'),
    };
  }
}
