import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IUsersState } from 'src/models/IUsersState';

export const selectUsersState = (state: IAppState) => state.usersState;

export const selectUsers = createSelector(
  selectUsersState,
  (state: IUsersState) => state.users
);

export const selectLoadingUsers = createSelector(
  selectUsersState,
  (state: IUsersState) => state.loadingUsers
);
