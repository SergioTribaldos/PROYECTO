/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository } from 'typeorm';

import { Message } from './message.entity';
import { MessageDto, NewConversationDto } from 'src/chat/types';
import { Conversation } from './conversation.entity';
import { Product } from 'src/products/product.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addMessage(messageData: MessageDto): Promise<any> {
    const conversationId = new Conversation();

    const message = new Message();
    message.conversation = conversationId;
    message.message = messageData.message;
    message.senderId = messageData.senderId;

    conversationId.id = messageData.conversationId;
    return await this.messageRepository.save(message);
  }

  async startConversation(messageData: NewConversationDto): Promise<any> {
    const conversation = new Conversation();
    conversation.buyerId = messageData.buyerId;
    conversation.sellerId = messageData.sellerId;

    const product = new Product();
    product.id = messageData.productId;

    conversation.products = [product];

    const newConversation = await this.conversationRepository.save(
      conversation,
    );

    const conversationId = newConversation.id;

    const conversatio = new Conversation();
    conversatio.id = conversationId;

    const message = new Message();
    message.senderId = messageData.buyerId;
    message.message = messageData.message;
    message.conversation = conversatio;

    await this.messageRepository.save(message);

    return newConversation.id;
  }

  async getConversations(userId: string): Promise<any> {
    const products = await getRepository(Conversation)
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.products', 'product')
      .leftJoinAndMapOne(
        'product.productPicture',
        'product.pictures',
        'picture',
      )

      .where('conversation.sellerId =:id ', { id: userId })
      .orWhere('conversation.buyerId =:id ', { id: userId })
      .getMany();

    const result = products.map(async conversation => {
      const recieverUserName = this.userRepository.findOne({
        where: {
          id:
            userId === conversation.buyerId
              ? conversation.sellerId
              : conversation.buyerId,
        },
      });

      return {
        buyerId: conversation.buyerId,
        sellerId: conversation.sellerId,
        conversationId: conversation.id,
        recieverUserName: (await recieverUserName).name,
        title: conversation.products[0].title,
        pictureUrl: conversation.products[0]['productPicture']['url'],
        product: conversation.products[0],
      };
    });

    return Promise.all(result);
  }

  async getConversationMessages(conversationId: number) {
    const conversation = new Conversation();
    conversation.id = conversationId;

    return await this.messageRepository.find({ conversation });
  }
}
