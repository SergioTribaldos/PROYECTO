import { Injectable, OnInit } from '@angular/core';
import {
  Actions,
  ofType,
  createEffect,
  Effect,
  OnInitEffects,
} from '@ngrx/effects';

import {
  tap,
  concatMap,
  map,
  mergeMap,
  withLatestFrom,
  debounce,
  debounceTime,
  first,
  skipWhile,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { PRODUCT_ACTIONS } from './product.actions';
import { of, forkJoin } from 'rxjs';
import { Store, Action, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductService } from '../../services/product.service';
import { getUserId, getUser } from 'src/app/auth/store/auth.selectors';

@Injectable()
export class HomeEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.loadProducts),
      concatMap(() => this.store.pipe(select(getUser))),
      concatMap((user) => this.productService.getAllProducts(user)),
      map((products) =>
        PRODUCT_ACTIONS.allProductsLoaded({ products: products })
      )
    )
  );

  searchProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.searchProducts),
        concatMap((params) =>
          this.productService.searchProducts(params.searchParams)
        ),
        map((products) => {
          console.log(products);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}
}
