import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import Express adapter

async function bootstrap() {
  // Hardcoded API credentials for Pesapal
  const PESAPAL_CONSUMER_KEY = '1vzScQWip6+BSDZgSyHLt70gKNYQ9AUK';
  const PESAPAL_CONSUMER_SECRET = 'Z3JAdEYkamufQXlvRLjDzOxg6aI=';

  // Log credentials for debugging (remove in production)
  console.log('Pesapal Consumer Key:', PESAPAL_CONSUMER_KEY);
  console.log('Pesapal Consumer Secret:', PESAPAL_CONSUMER_SECRET);

  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Use Express adapter

  // Serve static assets (uploads directory)
  app.useStaticAssets(join(__dirname, '..', 'uploads')); // Correct usage with 'join'

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001' , // Replace with your frontend's origin  , https://silverestboardinghouses.netlify.app/'
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

  // Set hardcoded port number
  const port = 3000; // Hardcoded port

  // Start the application
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available on: http://localhost:${port}/api`);
}

bootstrap();
