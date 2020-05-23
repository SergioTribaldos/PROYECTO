import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product /model/product';
import { select, Store } from '@ngrx/store';
import {
  selectAllProducts,
  isLoading,
} from '../product /store/product.selector';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectAllProducts));
    this.loading$ = this.store.pipe(select(isLoading));
  }
}
