import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { verifyUser } from '../middlewares/verifyUser';
import { ChannelController } from './channel.controller';
import {Channel} from './channel.entity';
import { SharedModule } from 'src/shared/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), SharedModule],
  providers: [ ChannelService, JwtService],
  controllers: [ChannelController],
  exports:[ChannelService, JwtService]
})

export class ChannelModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('channel');
  }
}