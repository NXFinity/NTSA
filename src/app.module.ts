import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        MONGODB_URI: joi.string().required(),
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
  ],
  // Registers controllers
  controllers: [],
  // Registers providers
  providers: [],
})
// Defines and exports AppModule class
export class AppModule {}
