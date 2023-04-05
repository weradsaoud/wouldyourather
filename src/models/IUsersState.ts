import { IUser } from "./IUser";

export interface IUsersState{
  users: { [key: string]: IUser };
  loadingUsers: boolean;
}
