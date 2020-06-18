import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getUserId } from 'src/app/auth/store/auth.selectors';
import { take, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { selectOneProduct } from 'src/app/home/product/store/product.selector';
import { Product } from 'src/app/home/product/model/product';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { MessageDto, NewConversationDto, ConversationMessage } from './types';
import { ProductMiniature } from '../types/types';
import { CHAT_ACTIONS } from './store/chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  newConversation$: Observable<Product>;
  serverConversations$: Observable<ProductMiniature[]>;
  conversationMessages: ConversationMessage[] = [];
  userId: string;
  selectedChat: MessageDto;
  selectedProduct: Product;
  newConversationData: NewConversationDto;
  newConversationSelected: boolean;
  APIENDPOINT_BACKEND = environment.APIENDPOINT_BACKEND;

  @ViewChild('container') messagesContainer: ElementRef;
  @ViewChild('messageInput') messageInput: ElementRef;

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(CHAT_ACTIONS.resetMessagesRecieved());

    this.chatService.receiveChat().subscribe((message) => {
      if (message.conversationId === this.selectedChat.conversationId) {
        this.conversationMessages.push(message);
        this.scrollBottom();
      }
    });

    this.store.pipe(select(getUserId), take(1)).subscribe((id) => {
      this.userId = id;
    });

    if (!!this.route.snapshot.queryParams) {
      this.startNewConversation();
    }

    this.serverConversations$ = this.messageService.getConversations(
      this.userId
    );
  }

  sendMessage(event) {
    const message = event.target.value;

    this.newConversationSelected
      ? this.sendFirstMessage(message)
      : this.sendOneMessage(message);
  }

  sendFirstMessage(message: string) {
    this.newConversationSelected = false;
    this.messageInput.nativeElement.value = '';
    const { productId, sellerId } = this.route.snapshot.queryParams;
    this.newConversationData = {
      productId,
      sellerId,
      buyerId: this.userId,
      message,
    };

    this.messageService
      .sendFirstMessage(this.newConversationData)
      .subscribe((conversationId) => {
        this.selectedChat = {
          senderId: this.userId,
          recieverId: this.userId === sellerId ? 0 : sellerId,
          conversationId,
        };
        this.conversationMessages.push({ ...this.selectedChat, message });
      });
  }

  sendOneMessage(message: string) {
    this.chatService.sendMessage({ ...this.selectedChat, message });
    this.conversationMessages.push({ ...this.selectedChat, message });
    this.messageInput.nativeElement.value = '';
    this.scrollBottom();
  }

  startNewConversation() {
    this.newConversationSelected = true;
    const { productId } = this.route.snapshot.queryParams;
    this.newConversation$ = this.store.pipe(
      select(selectOneProduct(productId))
    );
  }

  selectInboxConversation(product: ProductMiniature) {
    this.newConversationSelected = false;
    this.selectedProduct = product.product;
    this.selectedChat = {
      conversationId: product.conversationId,
      recieverId:
        product.buyerId === this.userId ? product.sellerId : product.buyerId,
      senderId: this.userId,
    };

    this.messageService
      .getMessages(product.conversationId)
      .pipe(
        take(1),
        tap((messages) => {
          this.conversationMessages = messages;
          this.scrollBottom();
        })
      )
      .subscribe();
  }

  scrollBottom() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = Math.max(
        0,
        this.messagesContainer.nativeElement.scrollHeight -
          this.messagesContainer.nativeElement.offsetHeight
      );
    }, 10);
  }
}
