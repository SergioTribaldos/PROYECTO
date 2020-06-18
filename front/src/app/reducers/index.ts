import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { productsReducer } from '../home/product/store/product.reducers';
import { userProductsReducer } from '../user-menu/store/user-product.reducers';
import { chatReducer } from '../user-menu/chat/store/chat.reducers';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  Products: productsReducer,
  'User Products': userProductsReducer,
  Chat: chatReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
