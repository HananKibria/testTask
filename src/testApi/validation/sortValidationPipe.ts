import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { SortEnum } from '../../contants/testApi.enums';


@Injectable()
export class SortValidationPipe implements PipeTransform {
  constructor() {}

  transform(value: any) {
      if (Object.values(SortEnum).includes(value)) {
        return value;
      } else {
        throw new BadRequestException('Invalid Sort Option');
      }
  }
}