import { createAction, props } from '@ngrx/store';
import { Product } from '../model/product';

export const PRODUCT_ACTIONS = {
  loadProducts: createAction('[Home Page] Load products'),

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
    props<{ searchParams: string }>()
  ),
};
