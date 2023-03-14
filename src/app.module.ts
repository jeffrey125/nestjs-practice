import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

// NOTES we use ConfigModule of nestjs to grab env vars and import it on this file
import { ConfigService, ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

/*
  NOTES

  TO start the app you can run `run start`

  This file serves us the import and export of our service

  - We can also import a third party module here and schema
*/

type AppConfigType = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  NODE_ENV: string;
};

@Module({
  imports: [
    // Injects the env vars and validate it
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<AppConfigType>({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'staging')
          .default('development'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      // We used useFactory to inject the env vars that comes from the ConfigModule
      useFactory: async (configService: ConfigService<AppConfigType>) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        // Our models imported from the typeorm entites folder
        entities: [User],
        // NOTES synchronize field is where it listens any changes from our app and reflects immediatly
        synchronize:
          configService.get('NODE_ENV') === 'development' ? true : false,
        // UTC Timezone
        timezone: 'Z',
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
