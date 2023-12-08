import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(configService.get('API_PREFIX'));
  await app.listen(configService.get('PORT') || 3001);
}
bootstrap();
