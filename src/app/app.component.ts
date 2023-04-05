import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/models/IAppState';
import { IQuestion } from 'src/models/IQuestion';
import { IUser } from 'src/models/IUser';
import { logout } from 'src/store/authStore/auth.actions';
import { selectAuth } from 'src/store/authStore/auth.selectors';
import { loadQuestions } from 'src/store/questionsStore/questions.actions';
import { selectQuestions } from 'src/store/questionsStore/questions.selectors';
import { loadUsers, saveUsers } from 'src/store/usersStore/users.actions';
import { selectUsers } from 'src/store/usersStore/users.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'WouldYouRather';
  authUser: IUser;
  usersNames: string[] = [];
  questionsIds: string[] = [];

  constructor(private store: Store<IAppState>, private router: Router) {
    this.store
      .select<{ [key: string]: IUser }>(selectUsers)
      .subscribe((users) => {
        this.usersNames = Object.keys(users);
      });

    this.store
      .select<{ [key: string]: IQuestion }>(selectQuestions)
      .subscribe((q) => {
        this.questionsIds = Object.keys(q);
      });

    this.store.select(selectAuth).subscribe((user) => {
      this.authUser = user;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadQuestions());
  }

  logOut() {
    this.store.dispatch(logout());
    this.router.navigate(['']);
  }
}
