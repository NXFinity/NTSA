import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from "./config/swagger.config";

/*
 This code is written in TypeScript. It creates a NestJS application with a global prefix of 'v1' and enables CORS for
 GET, POST, and PUT requests from all origins. The application also starts all microservices and sets up Swagger for API
 documentation. The application listens on the port specified in the environment variable NODE_PORT or port 3021 if
 NODE_PORT is not set.
*/

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['error', 'warn', 'debug'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
    },
  });

  // MICROSERVICE
  await app.startAllMicroservices();

  // V1 PREFIX FOR ALL ROUTES
  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  // SWAGGER
  setupSwagger(app);
  // PORT
  const port = process.env.NODE_PORT || 3021;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/${globalPrefix}`);
}
void bootstrap();
