import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackService } from './package.service';
import { verifyUser } from '../middlewares/verifyUser';
import { PackController } from './package.controller';
import {Package} from './package.entity';
import { SharedModule } from 'src/shared/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), SharedModule],
  providers: [ PackService, JwtService],
  controllers: [PackController],
})
//export class PackModule{}

export class PackModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('plan');
  }
}