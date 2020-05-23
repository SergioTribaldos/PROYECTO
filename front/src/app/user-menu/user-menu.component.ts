import { Component, OnInit } from '@angular/core';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { USER_PRODUCT_ACTIONS } from './store/user-product.actions';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  
}
