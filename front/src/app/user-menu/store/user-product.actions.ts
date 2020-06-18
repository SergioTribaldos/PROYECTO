import { createAction, props } from '@ngrx/store';
import { Product } from '../../home/product/model/product';

export const USER_PRODUCT_ACTIONS = {
  loadUserProducts: createAction('[User menu] Load user products'),

  reloadUserProducts: createAction(
    '[Upload product] Reload user products after uploading'
  ),

  resetUserProducts: createAction('[Logout] Reset user products'),

  allUserProductsLoaded: createAction(
    '[Load user products Effect] All user products loaded',
    props<{ products: Product[] }>()
  ),

  deleteUserProduct: createAction(
    '[User Menu] Delete user product',
    props<{ productId: number }>()
  ),
  userProductDeleted: createAction(
    '[User Menu] User product deleted',
    props<{ productId: number }>()
  ),
};
