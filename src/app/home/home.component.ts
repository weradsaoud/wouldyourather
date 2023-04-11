import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IQuestion } from 'src/models/IQuestion';
import { IUser } from 'src/models/IUser';
import { AuthService } from 'src/services/auth.service';
import { QuestionsService } from 'src/services/questions.service';
import { Usersservice } from 'src/services/users.service';
import { selectAuth } from 'src/store/authStore/auth.selectors';
import { selectQuestions } from 'src/store/questionsStore/questions.selectors';
import { selectUsers } from 'src/store/usersStore/users.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  authUser: IUser;
  questions: { [key: string]: IQuestion };
  users: { [key: string]: IUser };
  answeredQuestions: IQuestion[] = [];
  unAnsweredQuestions: IQuestion[] = [];
  constructor(
    //private store: Store<IAppState>
    private usersService: Usersservice,
    private questionsservice: QuestionsService,
    private authService: AuthService
  ) {
    // this.store.select(selectAuth).subscribe((user) => (this.authUser = user));
    // this.store
    //   .select(selectQuestions)
    //   .subscribe((questions) => (this.questions = questions));
    // this.store.select(selectUsers).subscribe((users) => (this.users = users));
  }
  ngOnInit(): void {
    this.authUser = this.authService.loggedInUser;
    this.questions = this.questionsservice.questions;
    this.users = this.usersService.users;
  }

  getAnsweredQuestions(): IQuestion[] {
    let answeredQuestions: IQuestion[] = [];
    let answeredQuestionsIds: string[] = Object.keys(
      this.users[this.authUser.id].answers
    );
    answeredQuestionsIds.forEach((qId) =>
      answeredQuestions.push(this.questions[qId])
    );
    return answeredQuestions.sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
    );
  }

  getUnAnsweredQuestions(): IQuestion[] {
    let answeredQuestionsIds: string[] = Object.keys(
      this.users[this.authUser.id].answers
    );
    let allQuestionsIds: string[] = Object.keys(this.questions);
    let unAnsweredQuestionsIds: string[] = allQuestionsIds.filter(
      (qId) => !answeredQuestionsIds.includes(qId)
    );

    return unAnsweredQuestionsIds
      .map((qId) => this.questions[qId])
      .sort((a, b) =>
        a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
      );
  }
}
