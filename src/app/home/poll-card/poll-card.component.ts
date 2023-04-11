import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IQuestion } from 'src/models/IQuestion';
import { IUser } from 'src/models/IUser';
import { AuthService } from 'src/services/auth.service';
import { QuestionsService } from 'src/services/questions.service';
import { Usersservice } from 'src/services/users.service';
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
    //private store: Store<IAppState>,
    private usersService: Usersservice,
    private questionsService: QuestionsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.store.select(selectUsers).subscribe((users) => (this.users = users));
    // this.store
    //   .select(selectQuestions)
    //   .subscribe((questions) => (this.questions = questions));
    // this.store.select(selectAuth).subscribe((user) => (this.authUser = user));
  }

  ngOnInit() {
    this.questionId = this.route.snapshot.params['qId'];
    this.question = this.questionsService.questions[this.questionId];
    this.authUserAnswer = this.getAuthUserAnswer();
    this.canPoll = this.authUserAnswer == '';
  }

  getAuthUserAnswer(): string {
    if (
      //this.question.optionOne.votes.includes(this.authUser.id)
      this.question.optionOne.votes.includes(this.authService.loggedInUser.id)
    )
      return 'optionOne';
    if (
      //this.question.optionTwo.votes.includes(this.authUser.id)
      this.question.optionTwo.votes.includes(this.authService.loggedInUser.id)
    )
      return 'optionTwo';
    return '';
  }

  getAuthorName(): string {
    return this.usersService.users[this.question.author].name;
  }

  getAuthorAvatar(): string {
    return this.usersService.users[this.question.author].avatarURL;
  }

  saveUserAnswer(event: Event) {
    // this.store.dispatch(
    //   saveQuestionAnswer({
    //     authUserId: this.authUser.id,
    //     qId: this.questionId,
    //     answer: this.authUserAnswer,
    //   })
    // );

    // this.store.dispatch(
    //   saveUserAnswer({
    //     authUserId: this.authUser.id,
    //     qId: this.questionId,
    //     answer: this.authUserAnswer,
    //   })
    // );
    this.questionsService.saveQuestionAnswer({
      //authUserId: this.authUser.id,
      authUserId: this.authService.loggedInUser.id,
      qId: this.questionId,
      answer: this.authUserAnswer,
    });
    this.usersService.saveUserAnswer({
      //authUserId: this.authUser.id,
      authUserId: this.authService.loggedInUser.id,
      qId: this.questionId,
      answer: this.authUserAnswer,
    });
  }

  viewResult() {
    this.router.navigate(['home', 'result', this.questionId]);
  }
}
