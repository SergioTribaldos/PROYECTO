import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../reducers';
import { USER_PRODUCT_ACTIONS } from '../user-menu/store/user-product.actions';
import { Store, select } from '@ngrx/store';
import { PRODUCT_ACTIONS } from './product /store/product.actions';
import { ChatService } from '@shared/chat.service';
import { CHAT_ACTIONS } from '../user-menu/chat/store/chat.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private store: Store<AppState>,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(PRODUCT_ACTIONS.loadProducts());
    this.store.dispatch(USER_PRODUCT_ACTIONS.loadUserProducts());
    this.chatService
      .receiveChat()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.store.dispatch(CHAT_ACTIONS.addMessageRecieved());
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
