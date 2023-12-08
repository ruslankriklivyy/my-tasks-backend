import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const uploadOptions = {
  storage: diskStorage({
    destination: configService.get('UPLOAD_DEST'),
    filename(_, file, cb) {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
