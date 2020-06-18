import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { tap, concatMap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthActions } from './action-types';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { NotificationsService } from '@shared/notifications.service';
import { User } from '../model/user';
import { ProductService } from 'src/app/home/services/product.service';
import { PRODUCT_ACTIONS } from 'src/app/home/product/store/product.actions';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { ChatService } from '@shared/chat.service';
import { USER_PRODUCT_ACTIONS } from 'src/app/user-menu/store/user-product.actions';

@Injectable()
export class AuthEffects {
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.chatService.connect(action.user.id);
          this.store.dispatch(PRODUCT_ACTIONS.loadProducts());
          this.store.dispatch(USER_PRODUCT_ACTIONS.loadUserProducts());
          this.router.navigate(['home/all']);
          localStorage.setItem(
            'userToken',
            JSON.stringify(action.user.access_token)
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        this.store.dispatch(USER_PRODUCT_ACTIONS.resetUserProducts());
        this.store.dispatch(PRODUCT_ACTIONS.resetProducts());
        this.store.dispatch(PRODUCT_ACTIONS.resetResultsSkipped());
        this.chatService.disconnect();
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        return AuthActions.userLoggedOut();
      })
    )
  );

  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkToken),
      concatMap((action) => {
        return this.authService.checkToken(action.token);
      }),
      map((action) => {
        return AuthActions.loginSuccess({ user: action });
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) => this.authService.login(action.user)),
      map((action: User) => {
        return AuthActions.loginSuccess({ user: action });
      }),
      catchError((err) => {
        this.notificationService.showNotification(
          'Usuario o contraseña incorrectos',
          'ko'
        );
        return throwError(err);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private store: Store<AppState>,
    private chatService: ChatService
  ) {}
}
