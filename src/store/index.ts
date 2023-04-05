import { ActionReducerMap } from "@ngrx/store";
import { IQuestion } from "src/models/IQuestion";
import { IQuestionsState } from "src/models/IQuestionsState";
import { IUser } from "src/models/IUser";
import { IUsersState } from "src/models/IUsersState";
import { authReducer } from "./authStore/auth.reducer";
import { questionsReducer } from "./questionsStore/questions.reducer";
import { usersReducer } from "./usersStore/users.reducer";
import {IAppState} from "../models/IAppState";


export const reducers: ActionReducerMap<IAppState> = {
  usersState: usersReducer,
  questionsState: questionsReducer,
  authState: authReducer
};
