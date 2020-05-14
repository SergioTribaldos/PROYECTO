import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { tap, concatMap, map, filter, catchError } from 'rxjs/operators';
import { isLoggedIn } from '../store/auth.selectors';
import { AuthState } from '../store/auth.reducers';
import { AuthActions } from '../store/action-types';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      throw new Error('No user token provided');
    }
    return this.authService.checkToken(JSON.parse(userToken)).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
