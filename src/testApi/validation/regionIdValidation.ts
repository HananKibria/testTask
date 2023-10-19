import { Injectable, PipeTransform,Scope, BadRequestException, Inject } from '@nestjs/common';
import { UserRole,RegionId } from '../../contants/testApi.enums';
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'


// Define the RegionIdValidationPipe class that implements the PipeTransform interface
@Injectable({ scope: Scope.REQUEST })
export class RegionIdValidationPipe implements PipeTransform {
  constructor(@Inject(REQUEST) protected readonly request: Request) {}

  transform(value: any) {
    // If the role is limited, check if the value is one of the limited region ids
    if (this.request["user"].username === UserRole.Limited) {
      if (Object.values(RegionId).includes(value)) { // Use the split method to convert the string to an array
        return (value);
      } else {
        throw new BadRequestException('Invalid region id for limited role');
      }
    }
    // If the role is not limited, check if the value is a valid region id or empty
    else if (value != null && value != undefined) {
      return (value);
    }
  }
}