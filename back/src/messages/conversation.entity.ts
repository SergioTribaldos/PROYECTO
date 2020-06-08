import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Message } from './message.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyerId: string;

  @Column()
  sellerId: string;

  @OneToMany(
    type => Message,
    message => message.id,
  )
  messages: Message[];

  @ManyToMany(
    type => Product,
    product => product.id,
  )
  @JoinTable()
  products: Product[];
}
