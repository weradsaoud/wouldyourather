import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { IAppState } from 'src/models/IAppState';

import { switchMap, map, catchError } from 'rxjs/operators';
import { loadUsers, saveUsers } from './users.actions';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private usersService: UsersService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        from(this.usersService.getUsers()).pipe(
          map((users) => saveUsers({ users: users }))
        )
      )
    )
  );
}
