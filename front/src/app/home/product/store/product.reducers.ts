import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, Predicate } from '@ngrx/entity';
import { PRODUCT_ACTIONS } from './product.actions';
import { Product } from '../model/product';

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  resultsSkipped: number;
  hasSearchFilters: boolean;
}
export const adapter = createEntityAdapter<Product>();
export const initialProductsState = adapter.getInitialState({
  loading: true,
  resultsSkipped: 0,
  hasSearchFilters: false,
});

export const productsReducer = createReducer(
  initialProductsState,
  on(PRODUCT_ACTIONS.allProductsLoaded, (state, action) => {
    return adapter.addMany(action.products, {
      ...state,
      loading: false,
    });
  }),

  on(PRODUCT_ACTIONS.searchProducts, (state) => {
    return { ...state, loading: true };
  }),

  on(PRODUCT_ACTIONS.setHasSearchFilters, (state, action) => {
    return { ...state, hasSearchFilters: action.hasSearchFilters };
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
  }),

  on(PRODUCT_ACTIONS.resetProducts, (state) => {
    return adapter.removeAll({ ...state });
  }),

  on(PRODUCT_ACTIONS.resetResultsSkipped, (state) => {
    return { ...state, resultsSkipped: 0 };
  })
);

export const loadProductReducer = createReducer(
  initialProductsState,
  on(PRODUCT_ACTIONS.productLoaded, (state, action) => {
    return adapter.addOne(action.product, state);
  })
);

export const { selectAll } = adapter.getSelectors();
