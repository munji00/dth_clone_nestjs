import { Controller, Post, Body, Get, Delete,Param, Res} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import {PackService } from './package.service';
import { Response } from 'express';
import { packageDto } from './dto/package.td';

@Controller('plan')
export class PackController {
    constructor(private service: PackService) { }

    @Post('create')
    async createPack(@Body() pack:packageDto ,@Res() res:Response){
        try {
            const newPack = await this.service.createPack(pack);
            res.status(201).send({success:true, newPack})
        } catch (error) {
            throw new HttpException('internal server error' , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('packs')
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