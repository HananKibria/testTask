import { ApiProperty,ApiPropertyOptional } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Rlm } from './rlm.entity';

@Entity({schema:'rnacen',name:'rnc_locus'})
export class Rl{

    @ApiPropertyOptional()
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ApiProperty()
    @Column({ name: 'assembly_id' })
    assemblyId!: string;
    
    @ApiProperty()
    @Column({ name: 'locus_name' })
    locusName!: string;

    @ApiProperty()
    @Column({ name: 'public_locus_name' })
    publicLocusName!: string;

    @ApiProperty()
    @Column({ name: 'chromosome' })
    chromosome!: string;

    @ApiProperty()
    @Column({ name: 'strand' })
    strand!: string;

    @ApiProperty()
    @Column({ name: 'locus_start' })
    locusStart!: number;

    @ApiProperty()
    @Column({ name: 'locus_stop' })
    locusStop!: number;

    @ApiProperty()
    @Column({ name: 'member_count' })
    memberCount!: number;

}
