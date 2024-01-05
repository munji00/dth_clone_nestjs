import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';
import { User_Plan } from 'src/subscriptions/subscription.entity';
import { packageDto } from './dto/package.td';
import { SubscriptionDto } from 'src/subscriptions/dto/subscription.td';

@Injectable()
export class PackService {

    constructor(
        @InjectRepository(Package) private packRepository: Repository<Package>,
        @InjectRepository(User_Plan) private subscriptionRepository: Repository<User_Plan>
        ) { }

   async createPack(packData:packageDto): Promise<packageDto> {
        const newPack = this.packRepository.create(packData);
        return await this.packRepository.save(newPack);
    }

    async createSubscription(subscriptionData:SubscriptionDto): Promise<SubscriptionDto> {
        const newSubscription = this.subscriptionRepository.create(subscriptionData);
        return await this.subscriptionRepository.save(newSubscription);
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

        async deleteSubscription(id:number):Promise<void> {
        this.subscriptionRepository.delete(id);
    }
}