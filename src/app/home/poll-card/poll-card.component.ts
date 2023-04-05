import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IQuestion } from 'src/models/IQuestion';
import { IUser } from 'src/models/IUser';
import { selectAuth } from 'src/store/authStore/auth.selectors';
import { saveQuestionAnswer } from 'src/store/questionsStore/questions.actions';
import { selectQuestions } from 'src/store/questionsStore/questions.selectors';
import { saveUserAnswer } from 'src/store/usersStore/users.actions';
import { selectUsers } from 'src/store/usersStore/users.selectors';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.css'],
})
export class PollCardComponent implements OnInit {
  users: { [key: string]: IUser };
  questions: { [key: string]: IQuestion };
  authUser: IUser;
  questionId: string;
  question: IQuestion;
  authUserAnswer: string;
  canPoll: boolean;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store.select(selectUsers).subscribe((users) => (this.users = users));
    this.store
      .select(selectQuestions)
      .subscribe((questions) => (this.questions = questions));
    this.store.select(selectAuth).subscribe((user) => (this.authUser = user));
  }

  ngOnInit() {
    this.questionId = this.route.snapshot.params['qId'];
    this.question = this.questions[this.questionId];
    this.authUserAnswer = this.getAuthUserAnswer();
    this.canPoll = this.authUserAnswer == '';
  }

  getAuthUserAnswer(): string {
    if (this.question.optionOne.votes.includes(this.authUser.id))
      return 'optionOne';
    if (this.question.optionTwo.votes.includes(this.authUser.id))
      return 'optionTwo';
    return '';
  }

  getAuthorName(): string {
    return this.users[this.question.author].name;
  }

  getAuthorAvatar(): string {
    return this.users[this.question.author].avatarURL;
  }

  saveUserAnswer(event: Event) {
    this.store.dispatch(
      saveQuestionAnswer({
        authUserId: this.authUser.id,
        qId: this.questionId,
        answer: this.authUserAnswer,
      })
    );

    this.store.dispatch(
      saveUserAnswer({
        authUserId: this.authUser.id,
        qId: this.questionId,
        answer: this.authUserAnswer,
      })
    );
  }

  viewResult() {
    console.log("viewResult(): ", this.questionId);

    this.router.navigate(['home', 'result', this.questionId]);
  }
}
