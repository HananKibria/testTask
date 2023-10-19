import { ApiProperty,ApiPropertyOptional } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Rl } from "./rl.entity";
import { IsNumber } from "class-validator";

@Entity({schema:'rnacen', name:'rnc_locus_members'})
export class Rlm {

    @ApiPropertyOptional()
    @PrimaryGeneratedColumn('increment',{name:'id'})
    locusMemeberId?: number;

    @ApiProperty()
    @Column({name:'urs_taxid'})
    ursTaxId!:string

    @ApiProperty()
    @Column({ name: 'region_id' })
    regionId!: number;

    @ApiProperty()
    @Column({name:'locus_id'})
    locusId !: number;

    @ApiProperty()
    @Column({name:'membership_status'})
    membershipStatus!:string

}