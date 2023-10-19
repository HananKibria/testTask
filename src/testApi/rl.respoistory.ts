import { RegionId, Sideload, SortDirectionEnum, SortEnum } from "../contants/testApi.enums";
import { Rl } from "./rl.entity";
import { Rlm } from './rlm.entity';
import {  Repository,DataSource } from "typeorm";
import {Injectable } from "@nestjs/common";

@Injectable()
export class RlRepository extends Repository<Rl>{
    constructor(private dataSource: DataSource) {
        super(Rl, dataSource.createEntityManager());
    }
    async getRncLocus(rlId: number,skip:number,take:number,assemblyId:string,regionId:number,sort:string,sortDirection:SortDirectionEnum,memberShipStatus:string,sideload:string) {
        const query = this.dataSource.manager.createQueryBuilder(Rl,'rl')
        if(sideload===Sideload.locusMembers){
            query.leftJoinAndMapMany('rl.locusMembers',Rlm,'rlm', 'rlm.locus_id = rl.id')
        }
        else{
            query.leftJoinAndSelect(Rlm,'rlm', 'rlm.locus_id = rl.id')
        }
        if (rlId != null && rlId != undefined) {
            query.where('rl.id=:rlId',{rlId:rlId})
        }
        if (assemblyId != null && assemblyId != undefined) {
            query.andWhere('rl.assembly_id = :assemblyId', { assemblyId: assemblyId });
        }
        if (regionId != null && regionId != undefined) {
            query.andWhere('rlm.region_id = :regionId', { regionId: regionId });
        }
       
        if (memberShipStatus != null && memberShipStatus != undefined) {
            query.andWhere('rlm.membership_status = :membershipStatus', { memberShipStatus: memberShipStatus });
        }
        query.offset(skip)
        query.limit(take)
        query.orderBy(`rlm.${sort}`,sortDirection);
        const result = await query.getMany();

        return result;
    }
}
