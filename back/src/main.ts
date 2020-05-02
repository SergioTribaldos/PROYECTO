import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/images', express.static(path.join(__dirname, '/images')));
  await app.listen(3000);
}
bootstrap();
