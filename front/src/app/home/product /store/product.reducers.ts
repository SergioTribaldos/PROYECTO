import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, Predicate } from '@ngrx/entity';
import { PRODUCT_ACTIONS } from './product.actions';
import { Product } from '../model/product';

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  resultsSkipped: number;
  firstLoading: boolean;
}
export const adapter = createEntityAdapter<Product>();
export const initialProductsState = adapter.getInitialState({
  loading: true,
  resultsSkipped: 0,
  firstLoading: false,
});

export const productsReducer = createReducer(
  initialProductsState,
  on(PRODUCT_ACTIONS.allProductsLoaded, (state, action) => {
    return adapter.addMany(action.products, {
      ...state,
      loading: false,
      firstLoading: true,
    });
  }),

  on(PRODUCT_ACTIONS.searchProducts, (state) => {
    return { ...state, loading: true };
  }),

  on(PRODUCT_ACTIONS.searchProductsLoaded, (state, action) => {
    return adapter.addAll(action.products, { ...state, loading: false });
  }),

  on(PRODUCT_ACTIONS.loadMoreProducts, (state) => {
    return {
      ...state,
      loading: true,
      resultsSkipped: state.resultsSkipped + 5,
    };
  })
);

export const loadProductReducer = createReducer(
  initialProductsState,
  on(PRODUCT_ACTIONS.productLoaded, (state, action) => {
    return adapter.addOne(action.product, state);
  })
);

export const { selectAll } = adapter.getSelectors();
