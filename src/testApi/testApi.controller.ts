import { Body, Controller, Get, Param, Post, Query, Req, Request, Res, UnauthorizedException, UseGuards, createParamDecorator } from '@nestjs/common';
import { 
    ApiBadRequestResponse, 
    ApiBearerAuth, 
    ApiInternalServerErrorResponse, 
    ApiNotFoundResponse, 
    ApiOkResponse, 
    ApiOperation, 
    ApiUnauthorizedResponse, 
    ApiTags, 
    ApiQuery
} from '@nestjs/swagger';
import { TestApiOutCome } from './dto/testApiOutcome.dto';
import { RegionIdValidationPipe } from './validation/regionIdValidation';
import { RegionId, Sideload, SortDirectionEnum, SortEnum, UserRole } from '../contants/testApi.enums';
import { JwtAuthGuard } from '../auth/jwt-auth';
import { TestApiService } from './testApi.service';
import { SideloadValidationPipe } from './validation/sideloadvalidation';
import {  SortValidationPipe } from './validation/sortValidationPipe';
import { SortDirectionValidationPipe } from './validation/sortDirectionValidationPipe';
import { LimitDTO } from './dto/limit.dto';
@ApiTags('TestApi')
@Controller('testApi')
export class TestApiController {
    constructor(private testApiService: TestApiService) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOkResponse({type: TestApiOutCome,isArray:true})
    @ApiOperation({ description: "Get rncLocus", operationId: "Get rncLocus"})
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiUnauthorizedResponse({ description: 'Not allowed' })
    @ApiQuery({ name: 'sort', enum: SortEnum })
    @ApiQuery({name:"sortDirection",enum:SortDirectionEnum}) 
    @ApiQuery({name:'sideload',required:false}) 
    @ApiQuery({name:'id',required:false})    
    @ApiQuery({name:'regionId',required:false})
    @ApiQuery({name:'assemblyId',required:false})
    @ApiQuery({name:'page'})
    @ApiQuery({name:'limit',type:LimitDTO})
    @ApiQuery({name:'membershipStatus',required:false})
    @Get()
    getInteractions(
        @Req() req: Request,
        @Query('id') id: number,
        @Query('regionId', RegionIdValidationPipe) regionId: RegionId,
        @Query('sideload',SideloadValidationPipe) sideload: Sideload,
        @Query('assemblyId') assemblyId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 1000,
        @Query('sort',new SortValidationPipe()) sort: SortEnum,
        @Query('sortDirection', new SortDirectionValidationPipe()) sortDirection: SortDirectionEnum,
        @Query('membershipStatus') memberShipStatus:string
    ): Promise<TestApiOutCome[]> {
        return  this.testApiService.get(id,assemblyId,regionId,sideload,page,limit,sort,sortDirection,memberShipStatus);
    }
}