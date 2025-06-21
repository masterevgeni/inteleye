import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import rateLimit from 'fastify-rate-limit';
async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  fastifyAdapter.register(rateLimit, {
    max: process.env.MAX_RATE_LiMIT, 
    timeWindow: '1 minute',
    errorResponseBuilder: function (req, context) {
      return {
        statusCode: 429,
        error: 'Too Many Requests',
        message: `You have exceeded the limit of ${context.max} requests in ${context.after}. Please try again later.`,
      };
    },
  });

  await app.register(require('@fastify/cors'), {
    origin: true,
    methods: ['GET', 'POST']
  });

  // API prefix
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());


  await app.listen(process.env.SERVER_PORT || 5000, process.env.allowed_origins || '');
}
bootstrap();
