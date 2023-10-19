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
import { hostname } from 'os';
import { AppModule } from './../src/app.module';
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
        
      }),TestApiModule,AppModule,AuthModule]
      
    }).overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = {"username":"admin",password:"123"};
        return true;
      },
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 1 elements with regionId=85431933', () => {
    return request(app.getHttpServer())
      .get('/testApi?regionId=85431933&sideload=locusMembers&page=0&limit=2&sort=region_id&sortDirection=ASC')
      .expect(200)
      .expect( [
          {
            "id": 155130,
            "assemblyId": "Acyr_2.0",
            "locusName": "fdce6657359b2871e9d3241178d2feb43868ac63240e98d0343936803a8a0340@GL350810/71337-71458:-1",
            "publicLocusName": "6549D347A6B805A9",
            "chromosome": "GL350810",
            "strand": "-1",
            "locusStart": 71337,
            "locusStop": 71458,
            "memberCount": 2,
            "locusMembers": [
              {
                "locusMemeberId": 655305,
                "regionId": 85431933,
                "locusId": 155130,
                "membershipStatus": "highlighted"
              }
            ],
            "ursTaxId": "URS000066123E_7029"
          }
        ])
  });

});