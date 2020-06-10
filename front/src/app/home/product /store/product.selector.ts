import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromCourses from './product.reducers';
import { ProductState } from './product.reducers';

export const selectProductState = createFeatureSelector<ProductState>(
  'Products'
);

export const selectAllProducts = createSelector(
  selectProductState,
  fromCourses.selectAll
);

export const selectProducts = createSelector(selectAllProducts, (products) => {
  return products;
});

export const areProductsLoaded = createSelector(
  selectAllProducts,
  (products) => {
    return products.length == 0;
  }
);

export const selectOneProduct = (_id: number) =>
  createSelector(selectAllProducts, (products) => {
    return products.find(({ id }) => id == _id);
  });

export const isLoading = createSelector(
  selectProductState,
  (products) => products.loading
);
