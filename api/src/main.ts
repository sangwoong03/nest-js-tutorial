import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

declare const module: any;

const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Easyux API')
    .setDescription('Easyux Backend API')
    .setVersion('5.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get('app.port');

  app.useGlobalPipes(new ValidationPipe())

  swaggerSetup(app);
  
  await app.listen(PORT);
  console.log(`Listening on port ${PORT}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
