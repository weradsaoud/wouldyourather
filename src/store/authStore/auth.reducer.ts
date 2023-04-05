import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/models/IUser';
import { login, logout } from './auth.actions';

export const initialState: IUser = null;

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => user),

  on(logout, (state) => null)
);
