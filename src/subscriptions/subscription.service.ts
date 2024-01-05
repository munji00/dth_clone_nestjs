import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_Plan} from './subscription.entity';
import { SubscriptionDto } from './dto/subscription.td';

@Injectable()
export class SubscriptionService {

    constructor(@InjectRepository(User_Plan) private subscriptionRepository: Repository<User_Plan>) { }

   async createSubscription(subscriptionData:SubscriptionDto): Promise<SubscriptionDto> {
        const newSubscription = this.subscriptionRepository.create(subscriptionData);
        return await this.subscriptionRepository.save(newSubscription);
    }


    async getSubscriptions(): Promise<SubscriptionDto[]> {
        return await this.subscriptionRepository.find();
    }


    async getSubscription(id: number): Promise<SubscriptionDto> {
        return await this.subscriptionRepository.findOne({where: { id }});
    }
 
}