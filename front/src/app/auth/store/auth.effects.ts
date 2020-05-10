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
import { PRODUCT_ACTIONS } from 'src/app/home/product /store/product.actions';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.router.navigate(['home/all']);
          localStorage.setItem(
            'userToken',
            JSON.stringify(action.user.access_token)
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((action) => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
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
    private store: Store<AppState>
  ) {}
}
