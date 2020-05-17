import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, mergeMap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductService } from '../../services/product.service';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { USER_PRODUCT_ACTIONS } from './user-product.actions';

@Injectable()
export class UserProductEffects {
  loadUserProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_PRODUCT_ACTIONS.loadUserProducts),
      mergeMap(() => this.store.pipe(take(1), select(getUser))),
      mergeMap((user) => this.productService.getUserProducts(user)),
      map((products) =>
        USER_PRODUCT_ACTIONS.allUserProductsLoaded({ products: products })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}
}
