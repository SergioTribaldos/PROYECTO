import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { MessageDto } from '../user-menu/chat/types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket: Socket;
  constructor() {}

  connect(userId: string) {
    const config: SocketIoConfig = {
      url: environment.APIENDPOINT_BACKEND,
      options: { query: { userId: userId } },
    };
    this.socket = new Socket(config);
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(data: MessageDto) {
    this.socket.emit('sendMessage', data);
  }

  getConversation({ productId, productUserId, userId }) {
    this.socket.emit('getConversation', { productId, productUserId, userId });
  }

  receiveChat(): Observable<MessageDto> {
    return this.socket.fromEvent('chat');
  }
}
