import { Injectable, PipeTransform, BadRequestException, } from '@nestjs/common';
import { SortDirectionEnum, SortEnum } from '../../contants/testApi.enums';


// Define the RegionIdValidationPipe class that implements the PipeTransform interface
@Injectable()
export class SortDirectionValidationPipe implements PipeTransform {
  constructor() {}

  transform(value: any) {
      if ( Object.values(SortDirectionEnum).includes(value)) {
        return value;
      } else {
        throw new BadRequestException('Invalid Sort Option');
      }
  }
}