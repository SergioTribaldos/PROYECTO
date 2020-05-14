import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, Predicate } from '@ngrx/entity';
import { PRODUCT_ACTIONS } from './product.actions';
import { Product } from '../model/product';

export interface ProductState extends EntityState<Product> {
  loading: boolean;
}
export const adapter = createEntityAdapter<Product>();
export const initialProductsState = adapter.getInitialState({ loading: true });

// Esta funcion calcula una nueva version del state basado en el estado anterior
// y la accion que le mandamos
export const productsReducer = createReducer(
  initialProductsState,
  on(PRODUCT_ACTIONS.allProductsLoaded, (state, action) => {
    return adapter.addAll(action.products, { ...state, loading: false });
  }),
  on(PRODUCT_ACTIONS.searchProducts, (state) => {
    return { ...state, loading: true };
  })
);

export const loadProductReducer = createReducer(
  initialProductsState,
  on(PRODUCT_ACTIONS.productLoaded, (state, action) => {
    return adapter.addOne(action.product, state);
  })
);

export const { selectAll } = adapter.getSelectors();
