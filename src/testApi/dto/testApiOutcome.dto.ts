import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class LocusMembers{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    locusMemeberId!:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    regionId !:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    locusId !:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    membershipStatus !:string
    
}

export class  TestApiOutCome{

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    assemblyId!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    locusName!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    publicLocusName!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    chromosome!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    strand!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    locusStart!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    locusStop!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    memberCount!: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    ursTaxId?: string;

    @ApiPropertyOptional({type:LocusMembers,isArray:true})
    @IsArray()
    @IsOptional()
    locusMembers?: LocusMembers[]

}

