import { Controller, Get, Delete,Param, Res} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Roles } from '../customDecorator/rolesReflector'

@Controller('user')
export class UsersController {
    constructor(private service: UsersService) { }

    @Roles(1)
    @Get('get-all')
    async getUsers(@Param() params ,@Res() res:Response){
        try {
            const usersData = await this.service.getUsers();
            res.status(200).send({success:true, usersData})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    
    @Get(':id')
    async getUser(@Param() params ,@Res() res:Response) {
        try {
            const user = await this.service.getUserwithPlans(params.id);
            res.status(200).send({success:true, user})
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Roles(1)
    @Delete(':id')
    async deleteUser(@Param() params) {
        try {
            await this.service.deleteUser(params.id);
            return "user deleted Successfully"
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}