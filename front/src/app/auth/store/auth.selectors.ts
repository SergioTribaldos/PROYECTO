import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(selectAuthState, (auth) => {
  return !!auth.user;
});

export const isLoggedOut = createSelector(
  selectAuthState,
  (loggedIn) => !loggedIn.user
);

export const getUser = createSelector(selectAuthState, (user) => {
  return user.user;
});

export const getUserId = createSelector(selectAuthState, (user) => {
  return user.user.id;
});
