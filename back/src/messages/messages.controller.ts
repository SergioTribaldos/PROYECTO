import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MessageDto, NewConversationDto } from 'src/chat/types';
import { MessageService } from './message.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @Post('byProduct')
  getConversationMessages(@Body() { conversationId }) {
    return this.messageService.getConversationMessages(conversationId);
  }

  @Get('conversations')
  getConversations(@Query() { userId }) {
    return this.messageService.getConversations(userId);
  }

  @Post('startConversation')
  async startNewConversation(
    @Body() messageData: NewConversationDto,
  ): Promise<number> {
    const result = await this.messageService.startConversation(messageData);
    return result.id;
  }
}
