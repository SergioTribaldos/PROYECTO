import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MessageDto, NewConversationDto, ConversationMessage } from './types';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessages(conversationId: number): Observable<ConversationMessage[]> {
    return this.http.post<any>(
      `${environment.APIENDPOINT_BACKEND}/messages/byProduct`,
      { conversationId }
    );
  }

  getConversations(userId: string) {
    return this.http.get<any>(
      `${environment.APIENDPOINT_BACKEND}/messages/conversations`,
      { params: { userId } }
    );
  }

  sendFirstMessage(messageData: NewConversationDto) {
    return this.http.post<any>(
      `${environment.APIENDPOINT_BACKEND}/messages/startConversation`,
      messageData
    );
  }
}
