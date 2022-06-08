import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // 이런식으로만 작성해 주어도 class-validator가 정상적으로 작동한다!
  await app.listen(3000);
}
bootstrap();
