import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './subscription.service';
import { verifyUser } from '../middlewares/verifyUser';
import { SubscriptionController } from './subscription.controller';
import {User_Plan} from './subscription.entity';
import { SharedModule } from 'src/shared/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User_Plan]), SharedModule],
  providers: [ SubscriptionService, JwtService],
  controllers: [SubscriptionController],
})


export class SubscriptionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('subscribe');
  }
}