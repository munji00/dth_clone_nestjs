import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { verifyUser } from '../middlewares/verifyUser';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { SharedModule } from 'src/shared/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  providers: [ UsersService ,JwtService ],
  controllers: [UsersController],
})
// class UsersModule{}

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyUser).forRoutes('user');
  }
}