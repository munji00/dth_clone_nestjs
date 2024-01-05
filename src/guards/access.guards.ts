import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../customDecorator/rolesReflector';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
     
    const request = context.switchToHttp().getRequest();
    const userRole = request.body.role

    if(userRole===roles) return true;


    throw new HttpException('Unauthorized access', HttpStatus.FORBIDDEN);
  

  }
}