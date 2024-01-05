import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackService } from './package.service';
import { verifyUser } from '../middlewares/verifyUser';
import { PlanController } from './package.controller';
import {Package} from './package.entity';
import { SharedModule } from 'src/shared/shared.module';
import { JwtService } from '@nestjs/jwt';
import { User_Plan } from 'src/subscriptions/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package]),TypeOrmModule.forFeature([User_Plan]), SharedModule],
  providers: [ PackService, JwtService],
  controllers: [PlanController],
})
//export class PackModule{}

export class PackModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('plan');
  }
}