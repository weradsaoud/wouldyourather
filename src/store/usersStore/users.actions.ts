import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/models/IUser';

export const saveUsers = createAction(
  '[Initialize App] SaveUsers',
  props<{ users: { [key: string]: IUser } }>()
);

export const loadUsers = createAction('[Initialize App] LoadUsers');
export const saveUserAnswer = createAction(
  '[Poll Component] SaveUserAnswer',
  props<{ authUserId: string; qId: string; answer: string }>()
);
export const saveUserQuestion = createAction(
  '[NewQuestion Component] SaveUserQuestion',
  props<{ questionId: string; authorId: string }>()
);
