import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  message: string;

  @Column()
  senderId: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @ManyToOne(
    type => Conversation,
    conversation => conversation.id,
    { onDelete: 'CASCADE' },
  )
  conversation: Conversation;
}
