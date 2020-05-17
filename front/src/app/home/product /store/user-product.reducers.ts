import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../model/product';
import { USER_PRODUCT_ACTIONS } from './user-product.actions';

export interface ProductState extends EntityState<Product> {}
export const adapter = createEntityAdapter<Product>();
export const initialUserProductsState = adapter.getInitialState();

export const userProductsReducer = createReducer(
  initialUserProductsState,
  on(USER_PRODUCT_ACTIONS.allUserProductsLoaded, (state, action) => {
    return adapter.addAll(action.products, state);
  })
);

export const { selectAll } = adapter.getSelectors();
