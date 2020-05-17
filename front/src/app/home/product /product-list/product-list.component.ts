import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import {
  selectAllProducts,
  selectProducts,
  isLoading,
} from '../store/product.selector';
import { AppState } from 'src/app/reducers';
import { PRODUCT_ACTIONS } from '../store/product.actions';
import { tap, map } from 'rxjs/operators';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectAllProducts));
    this.loading$ = this.store.pipe(select(isLoading));
  }
}
