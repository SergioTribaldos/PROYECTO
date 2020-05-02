import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, first, finalize } from 'rxjs/operators';
import { PRODUCT_ACTIONS } from './product.actions';

@Injectable()
export class ProductDetailResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<any>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          // 1 - Cuando le llega la ruta al router, despacha la accion loadAllCourses
          this.store.dispatch(
            PRODUCT_ACTIONS.loadOneProduct(route.params['id'])
          );
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
