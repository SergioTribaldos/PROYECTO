import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/home/product/model/product';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import {
  selectAllProducts,
  isLoading,
} from 'src/app/home/product/store/product.selector';
import { selectUserProducts } from 'src/app/user-menu/store/user-product.selectors';
import { USER_PRODUCT_ACTIONS } from '../store/user-product.actions';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css'],
})
export class UserProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectUserProducts));
  }

  deleteProduct(productId: number) {
    this.store.dispatch(
      USER_PRODUCT_ACTIONS.deleteUserProduct({ productId: productId })
    );
  }
}
