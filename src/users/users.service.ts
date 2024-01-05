import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { userDTO } from './dto/user';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

   async createUser(user:userDTO): Promise<userDTO> {
        const newUser = await this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }


    async getUsers(): Promise<userDTO[]> {
        return await this.usersRepository.find();
    }

    async getUserById(id: number): Promise<userDTO> {
        return await this.usersRepository.findOne({where: { id }});
    }

    async getUserwithPlans(id: number): Promise<userDTO> {
        return await this.usersRepository.findOne({where: { id }, relations:{user_plan:true}});
    }

    async getUserByEmail(email: string): Promise<userDTO> {
        return await this.usersRepository.findOne({where: { email }});
    }

    async deleteUser(user: userDTO) {
        this.usersRepository.delete(user);
    }
}