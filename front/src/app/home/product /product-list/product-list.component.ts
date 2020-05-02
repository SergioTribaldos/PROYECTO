import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectAllProducts, selectProducts } from '../store/product.selector';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<any>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProducts));
  }
}
