import { Component, OnInit } from '@angular/core';
import { AuthState } from './auth/store/auth.reducers';
import { Store, select } from '@ngrx/store';
import { AuthActions } from './auth/store/action-types';
import { AuthService } from './auth/services/auth.service';
import { AppState } from './reducers';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const userProfile = localStorage.getItem('userToken');

    if (userProfile) {
      this.store.dispatch(
        AuthActions.checkToken({ token: JSON.parse(userProfile) })
      );
    }
  }
  title = 'Wallarock';
}
