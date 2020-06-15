import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, mergeMap, take, tap, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductService } from '../../home/services/product.service';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { USER_PRODUCT_ACTIONS } from './user-product.actions';
import { NotificationsService } from '@shared/notifications.service';
import { areUserProductsLoaded } from './user-product.selectors';

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

  reloadUserProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_PRODUCT_ACTIONS.reloadUserProducts),
      mergeMap(() => this.store.pipe(take(1), select(getUser))),
      mergeMap((user) => this.productService.getUserProducts(user)),
      map((products) =>
        USER_PRODUCT_ACTIONS.allUserProductsLoaded({ products: products })
      )
    )
  );

  deleteUserProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_PRODUCT_ACTIONS.deleteUserProduct),
      mergeMap(({ productId }) =>
        this.productService.deleteUserProduct(productId).pipe(
          map(({ msg, status }) => {
            return {
              productId,
              msg,
              status,
            };
          })
        )
      ),
      map(({ msg, status, productId }) => {
        this.notificationsService.showNotification(msg, status);
        return USER_PRODUCT_ACTIONS.userProductDeleted({ productId });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService,
    private notificationsService: NotificationsService
  ) {}
}
