import { Injectable, OnInit } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';

import { tap, concatMap, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Store, Action } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { SHARED_ACTIONS } from './shared-actions';
import { NotificationsService } from '@shared/notifications.service';

@Injectable()
export class SharedEffects {
  loadProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SHARED_ACTIONS.showNotification),
        tap(({ msg, msgType }) => {
          this.notificationsService.showNotification(msg, msgType);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private notificationsService: NotificationsService
  ) {}
}
