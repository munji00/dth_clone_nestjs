import { Controller, Post, Body, Get, Delete,Param, UseInterceptors, Res} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ExistenceCheckInterceptor } from 'src/interceptors/isUserExist';
import { Response } from 'express';
import { userDTO } from './dto/user';

@Controller('user')
export class UsersController {
    constructor(private service: UsersService) { }

    
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
    getUser(@Param() params) {
        return this.service.getUserById(params.id);
    }

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