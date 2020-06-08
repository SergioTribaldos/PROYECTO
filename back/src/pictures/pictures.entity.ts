import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(
    type => Product,
    product => product.id,
    { onDelete: 'CASCADE' },
  )
  product: Product;
}
