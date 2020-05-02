/*
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HomeState } from './shared-reducers';

import * as fromCourses from './shared-reducers';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectAllProducts = createSelector(
  selectHomeState,
  fromCourses.selectAll
);

export const selectProducts = createSelector(selectAllProducts, (courses) => {
  // La consulta se realizara 2 veces, una al principio cuando no haya nada, y otra
  // cuando el store de courses se rellene

  return courses.filter((course) => course);
});

export const selectOneProduct = (_id: number) =>
  createSelector(selectAllProducts, (products) => {
    return products.find(({ id }) => id == _id);
  });
*/
