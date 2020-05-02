import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { UserMeDto } from '../model/user-me.dto';

import { AuthActions } from './action-types';
import { User } from '../model/user';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

// Esta funcion calcula una nueva version del state basado en el estado anterior
// y la accion que le mandamos
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      user: action.user,
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
