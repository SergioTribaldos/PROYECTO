import { createAction, props } from '@ngrx/store';
import { UserMeDto } from '../model/user-me.dto';
import { User } from '../model/user';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: UserMeDto }>()
);

export const loginSuccess = createAction(
  '[Login Page] User Login Success',
  props<{ user: User }>()
);

export const logout = createAction('[Top Menu] Logout');

export const checkToken = createAction(
  '[Login Page] App start token check',
  props<{ token: string }>()
);
