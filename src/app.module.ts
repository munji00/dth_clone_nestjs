import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Package } from './packages/package.entity';
import { Channel } from './channels/channel.entity';
import { User_Plan } from './subscriptions/subscription.entity';
import { AuthModule } from './auth/auth.module';
import { PackModule } from './packages/package.module';
import { ChannelModule } from './channels/channel.module';
import {config} from 'dotenv';


config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username:process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Package, Channel, User_Plan],
      synchronize: true,
    }),
   UsersModule, AuthModule, PackModule, ChannelModule
  ],
})
export class AppModule {}


