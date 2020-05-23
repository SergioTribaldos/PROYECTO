import { Component, OnInit } from '@angular/core';
import { AppState } from '../reducers';
import { USER_PRODUCT_ACTIONS } from '../user-menu/store/user-product.actions';
import { Store } from '@ngrx/store';
import { PRODUCT_ACTIONS } from './product /store/product.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(PRODUCT_ACTIONS.loadProducts());
    this.store.dispatch(USER_PRODUCT_ACTIONS.loadUserProducts());
  }
}
