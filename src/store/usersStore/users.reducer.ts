import { createReducer, on, State } from '@ngrx/store';
import { IUser } from 'src/models/IUser';
import { IUsersState } from 'src/models/IUsersState';
import {
  loadUsers,
  saveUserAnswer,
  saveUserQuestion,
  saveUsers,
} from './users.actions';

export const initialState: IUsersState = {
  users: {},
  loadingUsers: false,
};

export const usersReducer = createReducer(
  initialState,

  on(saveUsers, (state, { users }) => {
    return {
      ...state,
      users: { ...users },
      loadingUsers: false,
    };
  }),

  on(saveUserAnswer, (state, payload) => {
    let newUsers: { [key: string]: IUser } = {
      ...state.users,
      [payload.authUserId]: {
        ...state.users[payload.authUserId],
        answers: {
          ...state.users[payload.authUserId].answers,
          [payload.qId]: payload.answer,
        },
      },
    };
    console.log('newUsers: ', newUsers);

    return {
      ...state,
      users: newUsers,
    };
  }),

  on(saveUserQuestion, (state, payload) => {
    let newUsers: { [key: string]: IUser } = {
      ...state.users,
      [payload.authorId]: {
        ...state.users[payload.authorId],
        questions: state.users[payload.authorId].questions.concat([
          payload.questionId,
        ]),
      },
    };

    return {
      ...state,
      users: newUsers,
    };
  }),

  on(loadUsers, (state) => {
    return {
      ...state,
      loadingUsers: true,
    };
  })
);
