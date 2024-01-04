import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, BeforeInsert, AfterLoad } from 'typeorm';
import  * as bcrypt from 'bcryptjs';
import { User_Plan } from '../subscriptions/subscription.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  async hashedPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }

  
  @Column()
  role!:number;

  @Column()
  active!: boolean;

  @OneToMany(()=> User_Plan, (user_plan)=> user_plan.user, { cascade:true})
  user_plan!: User_Plan[];

}