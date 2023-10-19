//Copyright 2019-2022 Afiniti, Inc.
import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { TestApiController } from "./testApi.controller";
import { TestApiService } from "./testApi.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RlRepository } from "./rl.respoistory";
import { Rl } from "./rl.entity";
import { Rlm } from "./rlm.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Rl]),
        TypeOrmModule.forFeature([Rlm]),
        ConfigModule],
    controllers: [TestApiController],
    providers: [
        TestApiService,
        RlRepository
    ],
    exports: [TestApiService,RlRepository]
})
export class TestApiModule { }
