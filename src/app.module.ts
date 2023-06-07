import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './security/auth/auth.module';


@Module({
  // This module imports necessary modules and initializes the app
  imports: [
    // Loads configuration from .env files
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './env/.env.*'],
      load: [],
      // Validates basic configuration
      validationSchema: joi.object({
        NODE_ENV: joi
          .string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: joi.number().default(3021),
        // DATABASE URI
        MONGODB_URI: joi.string().required(),
        // JWT VALIDATION
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRATION_TIME: joi.string().required(),
      }),
    }),
    // Connects to MongoDB database
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    // Imports other modules
    AuthModule,
    UsersModule,
  ],
  // Registers controllers
  controllers: [],
  // Registers providers
  providers: [],
})
// Defines and exports AppModule class
export class AppModule {}
