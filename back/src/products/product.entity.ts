import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Picture } from 'src/pictures/pictures.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  categories: string;

  @Column()
  condition: 'mint' | 'semi_new' | 'used';

  @Column({ length: 600 })
  description: string;

  @Column()
  price: number;
  @Column()
  accept_changes: boolean;

  @Column()
  price_negotiable: boolean;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  user: User;

  @OneToMany(
    type => Picture,
    picture => picture.product,
  )
  pictures: Picture[];
}
