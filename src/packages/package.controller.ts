import { Controller, Post, Body, Get, Delete,Param, Res} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import {PackService } from './package.service';
import { Response } from 'express';
import { packageDto } from './dto/package.td';
import { Roles } from '../customDecorator/rolesReflector';
import { SubscriptionDto } from 'src/subscriptions/dto/subscription.td';

@Controller('plan')
export class PlanController {
    constructor(private service: PackService) { }

    @Post('subscribe/:id')
    async subscribe(@Body() subscription:SubscriptionDto , @Param() params ,@Res() res:Response){
        try {
            const newSubscription = await this.service.createSubscription({st_date:new Date(), userId:subscription.userId, packageId:params.id});
            res.status(201).send({success:true, newSubscription})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    

    @Roles(2)
    @Post('create')
    async createPack(@Body() pack:packageDto ,@Res() res:Response){
        try {
            const newPack = await this.service.createPack(pack);
            res.status(201).send({success:true, newPack})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('get-all')
    async getPacks(@Res() res:Response){
        try {
        const packData = await this.service.getPacks();
        res.status(200).send({success:true, packData})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    async getPack(@Param() params, @Res() res:Response) {
        try {
            const packData = await this.service.packWithChannels(params.id);
            res.status(200).send({success:true, packData});
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    
    @Delete('unsubscribe/:id')
     async unsubscribe(@Param() params) {
        try {
            await this.service.deleteSubscription(params.id);
            return "Plan Unsubscribe Successfully"
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Roles(2)
    @Delete(':id')
     async deletePack(@Param() params) {
        try {
            await this.service.deletePack(params.id);
            return "Pack deleted Successfully"
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
