import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
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

  @Column()
  productId: number;

  @OneToMany(
    type => Message,
    message => message.id,
    { onDelete: 'CASCADE' },
  )
  messages: Message[];

  @ManyToMany(
    type => Product,
    product => product.id,
    { onDelete: 'CASCADE' },
  )
  @JoinTable()
  products: Product[];
}
