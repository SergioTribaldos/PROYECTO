import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromCourses from './product.reducers';
import { ProductState } from './product.reducers';
import { EntityState } from '@ngrx/entity';
import { Product } from '../model/product';

export const selectProductState = createFeatureSelector<ProductState>(
  'Products'
);

export const selectAllProducts = createSelector(
  selectProductState,
  fromCourses.selectAll
);

export const selectProducts = createSelector(selectAllProducts, (products) => {
  // La consulta se realizara 2 veces, una al principio cuando no haya nada, y otra
  // cuando el store de courses se rellene

  return products.filter((product) => product);
});

export const selectOneProduct = (_id: number) =>
  createSelector(selectAllProducts, (products) => {
    return products.find(({ id }) => id == _id);
  });

export const isLoading = createSelector(
  selectProductState,
  (products) => products.loading
);
