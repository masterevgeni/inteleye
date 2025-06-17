import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(require('@fastify/cors'), {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // API prefix
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());


  await app.listen(process.env.SERVER_PORT || 5000, process.env.allowed_origins || '');
}
bootstrap();
