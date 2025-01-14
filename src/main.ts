import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configure Swagger options
  const config = new DocumentBuilder()
    .setTitle('Silverest Hostel API')
    .setDescription('API documentation for the Silverest Hostel backend')
    .setVersion('1.0')
    .addBearerAuth() // If using authentication
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module
  SwaggerModule.setup('api', app, document);

  // Start the application
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger documentation is available on: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
