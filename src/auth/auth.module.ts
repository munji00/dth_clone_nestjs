// auth/jwt.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '../auth/auth.service';
import { authController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { SharedModule } from 'src/shared/shared.module';
import { ExistenceCheckInterceptor } from 'src/interceptors/isUserExist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret:'jdsg7%uh4324%d$hgds',signOptions:{expiresIn:'1h'},}), SharedModule],
  controllers:[authController],
  providers: [UsersService,JwtService, {provide: 'ExistenceCheckInterceptor', useClass:ExistenceCheckInterceptor},]
})
export class AuthModule {}
