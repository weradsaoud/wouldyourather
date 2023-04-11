import { Injectable } from "@angular/core";
import { IUser } from "src/models/IUser";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: IUser = null;

  userLoggedIn = new Subject<IUser>();

  login(user: IUser) {
    this.loggedInUser = user;
    this.userLoggedIn.next(user);
  }

  logout() {
    this.loggedInUser = null;
    this.userLoggedIn.next(null);
  }

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve((this.loggedInUser != null) as boolean);
      }, 800);
    });
    return promise;
  }
}
