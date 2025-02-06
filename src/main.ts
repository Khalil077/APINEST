import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );//mnghir hedhy el body mch bch yekho  tinstance mn DTOBKOLO  
  //whitelist attribut li aandi yetkeblo-------------------------
  //forbidnonwhitelisted ay attribut zeyed yekebloush
  await app.listen(3000);
}

bootstrap();
