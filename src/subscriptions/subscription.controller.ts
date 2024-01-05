import { Controller, Post, Body, Get, Delete,Param, Res, Req} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import {SubscriptionService } from './subscription.service';
import {Response } from 'express';
import { Roles } from 'src/customDecorator/rolesReflector';


@Roles(2)
@Controller('subscription')
export class SubscriptionController {
    constructor(private service: SubscriptionService) { }
    
    @Get('get-all')
    async getSubscriptions(@Res() res:Response){
        try {
        const subscriptions = await this.service.getSubscriptions();
        res.status(200).send({success:true, subscriptions})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    async getSubscription(@Param() params, @Res() res:Response) {
        try {
            const subscription= await this.service.getSubscription(params.id);
            res.status(200).send({success:true, subscription});
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}