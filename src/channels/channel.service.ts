import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { ChannelDto } from './dto/channel.td';

@Injectable()
export class ChannelService {

    constructor(@InjectRepository(Channel) private channelRepository: Repository<Channel>) { }

   async createChannel(channelData:ChannelDto): Promise<ChannelDto> {
        const newChannel = this.channelRepository.create(channelData);
        return await this.channelRepository.save(newChannel);
    }


    async getChannels(): Promise<ChannelDto[]> {
        return await this.channelRepository.find();
    }


    async getChannel(id: number): Promise<ChannelDto> {
        return await this.channelRepository.findOne({where: { id }});
    }
 

    async deleteChannel(id:number):Promise<void> {
        this.channelRepository.delete(id);
    }
}