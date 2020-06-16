import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromProducts from './product.reducers';
import { ProductState } from './product.reducers';

export const selectProductState = createFeatureSelector<ProductState>(
  'Products'
);

export const selectAllProducts = createSelector(
  selectProductState,
  fromProducts.selectAll
);

export const selectProducts = createSelector(selectAllProducts, (products) => {
  return products;
});

export const selectOneProduct = (_id: number) =>
  createSelector(selectAllProducts, (products) => {
    return products.find(({ id }) => id == _id);
  });

export const isLoading = createSelector(
  selectProductState,
  (products) => products.loading
);

export const getSkippedResults = createSelector(
  selectProductState,
  (products) => products.resultsSkipped
);

export const getHasSearchFilters = createSelector(
  selectProductState,
  (products) => products.hasSearchFilters
);
