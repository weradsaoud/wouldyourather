import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IUser } from 'src/models/IUser';
import { selectAuth } from './auth.selectors';

@Injectable()
export class AuthService {
  loggedInUser: IUser;
  constructor(private store: Store<IAppState>) {
    this.store.select<IUser>(selectAuth).subscribe((user) => {
      this.loggedInUser = user;
    });
  }

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve((this.loggedInUser != null) as boolean);
      }, 800);
    });
    return promise;
  }

  // login() {
  //   this.loggedIn = true;
  // }

  // logout() {
  //   this.loggedIn = false;
  // }
}
