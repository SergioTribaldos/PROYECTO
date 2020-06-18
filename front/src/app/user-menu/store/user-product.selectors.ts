import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromUserProducts from '../../home/product/store/product.reducers';
import { ProductState } from '../../home/product/store/product.reducers';
import { EntityState } from '@ngrx/entity';
import { Product } from '../../home/product/model/product';

export const selectProductState = createFeatureSelector<ProductState>(
  'User Products'
);

export const selectAllUserProducts = createSelector(
  selectProductState,
  fromUserProducts.selectAll
);

export const selectUserProducts = createSelector(
  selectAllUserProducts,
  (products) => {
    return products.filter((product) => product);
  }
);

export const areUserProductsLoaded = createSelector(
  selectAllUserProducts,
  (products) => {
    return products.length == 0;
  }
);

export const selectOneUserProduct = (_id: number) =>
  createSelector(selectAllUserProducts, (products) => {
    return products.find(({ id }) => id == _id);
  });

export const isUserProduct = (productId: number) =>
  createSelector(selectAllUserProducts, (products) =>
    products.some(({ id }) => productId)
  );
