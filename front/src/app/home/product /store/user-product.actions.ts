import { createAction, props } from '@ngrx/store';
import { Product } from '../model/product';

export const USER_PRODUCT_ACTIONS = {
  loadUserProducts: createAction('[User menu] Load user products'),

  allUserProductsLoaded: createAction(
    '[Load user products Effect] All user products loaded',
    props<{ products: Product[] }>()
  ),
};
