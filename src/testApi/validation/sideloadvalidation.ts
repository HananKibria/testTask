import { Injectable, PipeTransform,Scope, BadRequestException, Inject } from '@nestjs/common';
import { UserRole, Sideload } from '../../contants/testApi.enums';
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'


// Define the RegionIdValidationPipe class that implements the PipeTransform interface
@Injectable({ scope: Scope.REQUEST })
export class SideloadValidationPipe implements PipeTransform {
  constructor(@Inject(REQUEST) protected readonly request: Request) {}

  transform(value: any) {
    // If the role is limited, check if the value is one of the limited region ids
    if (this.request["user"].username === UserRole.Normal) {
      if (value===Sideload.locusMembers) { 
         throw new BadRequestException('SideLoad Not Allowed');
      } else {
        return undefined;
      }
    }
    else {
      if (value === undefined || Object.values(Sideload).includes(value)) {
        return value;
      } else {
        throw new BadRequestException('Invalid SideLoad Value');
      }
    }
  }
}