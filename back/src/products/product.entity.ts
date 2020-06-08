import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Picture } from 'src/pictures/pictures.entity';
import { Conversation } from 'src/messages/conversation.entity';

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

  @Column({ default: 0 })
  viewed_times: number;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  uploaded_at: Date;

  @ManyToOne(
    type => User,
    user => user.id,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @OneToMany(
    type => Picture,
    picture => picture.product,
    { onDelete: 'CASCADE' },
  )
  pictures: Picture[];

  @ManyToMany(
    type => Conversation,
    conversation => conversation.id,
    { onDelete: 'CASCADE' },
  )
  conversations: Conversation[];
}
