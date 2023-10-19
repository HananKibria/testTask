import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestApiModule } from './../src/testApi/testApi.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { Rl } from './../src/testApi/rl.entity';
import { Rlm } from './../src/testApi/rlm.entity';
import { JwtAuthGuard } from './../src/auth/jwt-auth';
import {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { AuthModule } from './../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ ConfigModule.forRoot(),JwtModule.register({
        global: true,
        secret: "12334",
        signOptions: { expiresIn: '3600s' },
      }),TypeOrmModule.forRootAsync({
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
        
      }),TestApiModule]
      
    }).overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = {"username":"normal",password:"123"};
        return true;
      },
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return side load not allowed', () => {
    return request(app.getHttpServer())
      .get('/testApi?sideload=locusMembers&page=0&limit=2&sort=locus_id&sortDirection=ASC')
      .expect(400)
      .expect({
        "message": "SideLoad Not Allowed",
        "error": "Bad Request",
        "statusCode": 400
      })
  });

});