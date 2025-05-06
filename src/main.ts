import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(
    {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('AgroVerde Logística API')
    .setDescription(
      'API para gerenciamento de usuários, caminhões, entregas e manutenções da AgroVerde Logística',
    )
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
