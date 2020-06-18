import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../home/product/model/product';
import { USER_PRODUCT_ACTIONS } from './user-product.actions';

export interface ProductState extends EntityState<Product> {}
export const adapter = createEntityAdapter<Product>();
export const initialUserProductsState = adapter.getInitialState();

export const userProductsReducer = createReducer(
  initialUserProductsState,
  on(USER_PRODUCT_ACTIONS.allUserProductsLoaded, (state, action) => {
    return adapter.addAll(action.products, state);
  }),
  on(USER_PRODUCT_ACTIONS.userProductDeleted, (state, action) => {
    return adapter.removeOne(action.productId, state);
  }),
  on(USER_PRODUCT_ACTIONS.resetUserProducts, (state) => {
    return adapter.removeAll({ ...state });
  })
);

export const { selectAll } = adapter.getSelectors();
