import { createAction, props } from '@ngrx/store';

export const SHARED_ACTIONS = {
  showNotification: createAction(
    '[Any ] Show notification',
    props<{ msg: string; msgType: string }>()
  ),
};
