import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Package } from '../packages/package.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  description!: string;

  @Column()
  packId!:number;

  @ManyToOne(()=> Package, (pack)=> pack.channels)
  pack!:Package;

}