import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));


  // const port = process.env.APP_PORT || 3001;
  // const host = process.env.APP_HOST ||'localhost';

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // await app.listen(port, host, () => {
  //   console.log(`Server is running on port: http://${host}:${port}`);
  // });
  await app.listen(3001, '0.0.0.0');
  console.log(`Application is running on: http://localhost:3001`);
}

bootstrap();