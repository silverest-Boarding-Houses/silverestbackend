import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import Express adapter


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Use Express adapter

  // Serve static assets (uploads directory)
  app.useStaticAssets(join(__dirname, '..', 'uploads')); // Correct usage with 'join'

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
