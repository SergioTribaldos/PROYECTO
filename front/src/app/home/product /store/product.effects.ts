import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, mergeMap, take, tap, switchMap } from 'rxjs/operators';
import { PRODUCT_ACTIONS } from './product.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductService } from '../../services/product.service';
import { getUser } from 'src/app/auth/store/auth.selectors';

@Injectable()
export class HomeEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.loadProducts),
      mergeMap(() => this.store.pipe(take(1), select(getUser))),
      mergeMap((user) => this.productService.getAllProducts(user)),
      map((products) =>
        PRODUCT_ACTIONS.allProductsLoaded({ products: products })
      )
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.searchProducts),
      mergeMap((params) =>
        this.store.pipe(
          take(1),
          select(getUser),
          map((user) => {
            return { user, params };
          })
        )
      ),
      mergeMap(({ user, params }) =>
        this.productService
          .searchProducts(user, params.searchParams)
          .pipe(
            map((products) =>
              PRODUCT_ACTIONS.allProductsLoaded({ products: products })
            )
          )
      )
    )
  );

  productViewed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.productViewed),
        switchMap(({ productId }) =>
          this.productService.addViewedProduct(productId)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}
}
