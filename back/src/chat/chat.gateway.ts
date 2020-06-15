import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessageService } from 'src/messages/message.service';
import { MessageDto, ConnectedUser } from './types';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  users: ConnectedUser[] = [];
  constructor(private messageService: MessageService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    this.users.push({
      userId: client.handshake.query.userId,
      socketId: client.id,
    });
    console.log('connect', this.users);
  }

  handleDisconnect(client: Socket) {
    this.users = this.users.filter(user => user.socketId !== client.id);
    console.log('disconnect', this.users);
  }

  @SubscribeMessage('sendMessage')
  onChat(message: MessageDto) {
    this.messageService.addMessage(message);

    const recieverSocket: ConnectedUser = this.users.filter(
      user => user.userId === message.recieverId,
    )[0];

    if (!!recieverSocket) {
      this.server.in(recieverSocket.socketId).emit('chat', message);
    }
  }
}
