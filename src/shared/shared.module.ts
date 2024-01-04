import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],  
  providers: [JwtService, UsersService],
  exports: [JwtService, UsersService], 
})
export class SharedModule {}
