import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from 'typeorm';
import { User_Plan } from '../subscriptions/subscription.entity';
import { Channel } from '../channels/channel.entity';

@Entity()
export class Package{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  duration!: string;

  @Column()
  price!: number;

  @OneToMany(()=>User_Plan , (user_plan)=> user_plan.package)
  user_plan!:User_Plan[]

  @OneToMany(()=>Channel, (channel)=> channel.pack, { cascade:true})
  @JoinTable()
  channels!:Channel[]

}