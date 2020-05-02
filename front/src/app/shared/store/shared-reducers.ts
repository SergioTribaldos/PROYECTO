import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { EntityState, createEntityAdapter, Predicate } from '@ngrx/entity';
import { SHARED_ACTIONS } from './shared-actions';

/*
export interface HomeState extends EntityState<Product> {}
export const adapter = createEntityAdapter<Product>();
export const initialProductsState = adapter.getInitialState();

// Esta funcion calcula una nueva version del state basado en el estado anterior
// y la accion que le mandamos
export const homeReducer = createReducer(
  initialProductsState,
  on(SHARED_ACTIONS.allProductsLoaded, (state, action) => {
    return adapter.addAll(action.products, state);
  })
);


export const { selectAll } = adapter.getSelectors();
*/
