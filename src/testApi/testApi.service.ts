import { Inject, Injectable, } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TestApiOutCome } from "./dto/testApiOutcome.dto";
import { RegionId, Sideload, SortDirectionEnum, SortEnum } from "../contants/testApi.enums";
import { RlRepository } from "./rl.respoistory";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class TestApiService {
    constructor(

        private readonly configService: ConfigService,
        private readonly rlRepository: RlRepository,

    ) { }

    async get(id:number,assemblyId:string,regionId:string,sideload:Sideload,page:number,limit:number,sort:SortEnum,sortDirection:SortDirectionEnum,memberShipStatus:string): Promise<TestApiOutCome[]> {
        let  regId:number;
        if (regionId != null && regionId != undefined) {
            regId=parseInt(regionId)
        }
        console.log(regId)
        let result=await this.rlRepository.getRncLocus(id,page,limit,assemblyId,regId,sort,sortDirection,memberShipStatus,sideload)
        console.log(result);
        let out=result.map((object:any)=>{
            if(object.locusMembers && object.locusMembers.length>=1){
                object.ursTaxId=object.locusMembers[0].ursTaxId
                object.locusMembers.map((member:any)=>{
                    delete member.ursTaxId
                })
            }
           return object
       })
        return out
    // return [ {
    //     id:1,
    //     assemblyId:"",
    //     publicLocusName:"",
    //     locusName:"",
    //     locusStart:1,
    //     locusStop:2,
    //     chromosome:"",
    //     strand:"",
    //     memberCount:3

    // }]
    }   

}