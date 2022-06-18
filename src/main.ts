import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { env } from 'process';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes (
    new ValidationPipe({
      whitelist: true,
    })
  )
  app.use(json());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
