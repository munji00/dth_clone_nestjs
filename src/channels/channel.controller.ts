import { Controller, Post, Body, Get, Delete,Param, Res} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import {ChannelService } from './channel.service';
import { Response } from 'express';
import { ChannelDto } from './dto/channel.td';

@Controller('channel')
export class ChannelController {
    constructor(private service: ChannelService) { }

    @Post('create')
    async createChannel(@Body() channel:ChannelDto ,@Res() res:Response){
        try {
            const newChannel = await this.service.createChannel(channel);
            res.status(201).send({success:true, newChannel})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('get-all')
    async getChannels(@Res() res:Response){
        try {
        const channels = await this.service.getChannels();
        res.status(200).send({success:true, channels})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    async getChannel(@Param() params, @Res() res:Response) {
        try {
            const channel= await this.service.getChannel(params.id);
            res.status(200).send({success:true, channel});
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @Delete(':id')
     async deleteChannel(@Param() params) {
        try {
            await this.service.deleteChannel(params.id);
            return "channel deleted Successfully"
        } catch (error) {
            throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}