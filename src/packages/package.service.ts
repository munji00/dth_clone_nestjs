import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';
import { packageDto } from './dto/package.td';

@Injectable()
export class PackService {

    constructor(@InjectRepository(Package) private packRepository: Repository<Package>) { }

   async createPack(packData:packageDto): Promise<packageDto> {
        const newPack = this.packRepository.create(packData);
        return await this.packRepository.save(newPack);
    }


    async getPacks(): Promise<packageDto[]> {
        return await this.packRepository.find();
    }

    async getPack(id: number): Promise<packageDto> {
        return await this.packRepository.findOne({where: { id }});
    }

    async packWithChannels(id: number): Promise<packageDto> {
        return await this.packRepository.findOne({where: { id },relations:{channels:true}});
    }


    async deletePack(id:number):Promise<void> {
        this.packRepository.delete(id);
    }
}