import { createSelector } from "@ngrx/store";
import { IAppState } from "src/models/IAppState";
import { IUser } from "src/models/IUser";

export const selectAuth = (state: IAppState) => state.authState;
