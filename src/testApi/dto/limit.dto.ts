// region-query.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LimitDTO {
  @ApiProperty({
    default: 1000, 
    required: true, 
    description: 'The limit of the page',// optional
  })
  @IsNotEmpty()
  limit!: number;
}
