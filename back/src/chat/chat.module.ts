import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageService } from 'src/messages/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/message.entity';
import { Conversation } from 'src/messages/conversation.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation, User])],
  providers: [ChatGateway, MessageService],
  exports: [TypeOrmModule, MessageService],
})
export class ChatModule {}
