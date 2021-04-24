import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiPrefix } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.setGlobalPrefix('/api/auth')

  const config = new DocumentBuilder()
    .setTitle('Auth Microservice')
    .setDescription('Authorization microservice which allows user to be authorized.')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ApiPrefix.AUTH_DOCS, app, document);

  await app.listen(3001);
}

bootstrap();
