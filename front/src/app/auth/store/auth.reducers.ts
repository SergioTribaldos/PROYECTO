import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './action-types';
import { User } from '../model/user';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      user: action.user,
    };
  }),

  on(AuthActions.userLoggedOut, (state, action) => {
    return {
      user: undefined,
    };
  })
);
