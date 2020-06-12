import { createAction, props } from '@ngrx/store';
import { Product } from '../model/product';
import { EntityMap } from '@ngrx/entity';

export const PRODUCT_ACTIONS = {
  loadProducts: createAction('[Home Page] Load products'),

  loadMoreProducts: createAction('[Home Page] Load more products'),

  allProductsLoaded: createAction(
    '[Load products Effect] All products loaded',
    props<{ products: Product[] }>()
  ),

  loadOneProduct: createAction(
    '[Product detail] Load one product',
    props<{ id: string }>()
  ),

  productLoaded: createAction(
    '[Load one product effect] Product loaded',
    props<{ product: Product }>()
  ),

  searchProducts: createAction(
    '[Home Page] Search product',
    props<{ searchParams: any }>()
  ),

  searchProductsLoaded: createAction(
    '[Search products Effect] Search products loaded',
    props<{ products: Product[] }>()
  ),

  productViewed: createAction(
    '[Product detail] Product viewed',
    props<{ productId: number }>()
  ),
};
