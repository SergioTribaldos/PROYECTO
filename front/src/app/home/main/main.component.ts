import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../product /model/product';
import { select, Store } from '@ngrx/store';
import {
  selectAllProducts,
  isLoading,
} from '../product /store/product.selector';
import { AppState } from 'src/app/reducers';
import { PRODUCT_ACTIONS } from '../product /store/product.actions';
import { USER_PRODUCT_ACTIONS } from 'src/app/user-menu/store/user-product.actions';
import { takeUntil } from 'rxjs/operators';
import { CHAT_ACTIONS } from 'src/app/user-menu/chat/store/chat.actions';
import { ChatService } from '@shared/chat.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  resultsSkipped: number;

  throttle = 40;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  constructor(
    private store: Store<AppState>,
    private chatService: ChatService
  ) {
    this.products$ = this.store.pipe(select(selectAllProducts));
    this.loading$ = this.store.pipe(select(isLoading));
  }
  ngOnInit(): void {
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

  onScrollDown() {
    this.store.dispatch(PRODUCT_ACTIONS.loadMoreProducts());
  }
}
