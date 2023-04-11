import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IUser } from 'src/models/IUser';
import { AuthService } from 'src/services/auth.service';
import { Usersservice } from 'src/services/users.service';
import { login } from 'src/store/authStore/auth.actions';
import { selectUsers } from 'src/store/usersStore/users.selectors';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  users: IUser[] = [];
  selectedUserId: string = '';
  selectedUserName: string = 'Please, select a user.';
  loggingIn: boolean = false;
  constructor(
    //private store: Store<IAppState>,
    private usersService: Usersservice,
    private authService: AuthService,
    private router: Router
  ) {
    // this.store
    //   .select<{ [key: string]: IUser }>(selectUsers)
    //   .subscribe((users) => {
    //     let usersIds: string[] = Object.keys(users);
    //     usersIds.forEach((userId) => {
    //       this.users.push(users[userId]);
    //     });
    //   });
  }
  ngOnInit(): void {
    let usersIds: string[] = Object.keys(this.usersService.users);
    usersIds.forEach((userId) => {
      this.users.push(this.usersService.users[userId]);
    });
  }

  selecteUserId(userId: string) {
    this.selectedUserId = userId;
    this.selectedUserName = this.users.find((u) => u.id === userId)?.name;
  }

  logIn() {
    this.loggingIn = true;
    let user: IUser = this.users.find(
      (user) => user.id === this.selectedUserId
    );
    //this.store.dispatch(login({ user: user }));
    this.authService.login(user);
    this.router.navigate(['home']);
  }
}
