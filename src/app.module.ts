import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigService } from './config/config.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TestApiModule } from './testApi/testApi.module';
import { NestEmitterModule } from 'nest-emitter';
import { EventEmitter } from 'events';
import { AuthModule } from './auth/auth.module';
import { Rl } from './testApi/rl.entity';
import { Rlm } from './testApi/rlm.entity';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory: (configService: ConfigService) => ({
       ...{ type: 'postgres' as 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        synchronize: false,
      },entities:  [Rl,Rlm]}),
      inject: [ConfigService],
      
    }),
  NestEmitterModule.forRoot(new EventEmitter),
  TestApiModule,
  AuthModule
],
  controllers: [],
})
export class AppModule {}
