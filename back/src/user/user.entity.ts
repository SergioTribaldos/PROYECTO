import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Product } from 'src/products/product.entity';

interface Point {
  lat: string;
  lng: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'point',
    nullable: true,
    transformer: {
      from: v => v,
      to: v => `POINT(${v.lat} ${v.lng})`,
    },
  })
  coords?: Point;

  lat?: string;

  lng?: string;

  @OneToMany(
    type => Product,
    product => product.user,
  )
  products?: Product[];
}
