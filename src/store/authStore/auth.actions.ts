import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/models/IUser';

export const login = createAction('[Login Component] Login', props<{ user: IUser }>());
export const logout = createAction('[Login Component] Logout');
