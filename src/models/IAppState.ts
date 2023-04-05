import { IQuestionsState } from './IQuestionsState';
import { IUser } from './IUser';
import { IUsersState } from './IUsersState';

export interface IAppState {
  usersState: IUsersState;
  questionsState: IQuestionsState;
  authState: IUser;
}
