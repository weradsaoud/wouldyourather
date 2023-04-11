import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css'],
})
export class ResultCardComponent implements OnInit {
  users: { [key: string]: IUser };
  questions: { [key: string]: IQuestion };
  authUser: IUser;
  questionId: string;
  question: IQuestion;
  authUserAnswer: string;
  optionOnePercent: number;
  optionTwoPercent: number;

  constructor(
    //private store: Store<IAppState>,
    private usersService: Usersservice,
    private questionsService: QuestionsService,
    private authService: AuthService,
    private router: ActivatedRoute
  ) {
    // this.store.select(selectUsers).subscribe((users) => (this.users = users));
    // this.store
    //   .select(selectQuestions)
    //   .subscribe((questions) => (this.questions = questions));
    // this.store.select(selectAuth).subscribe((user) => (this.authUser = user));
  }

  ngOnInit(): void {
    this.questionId = this.router.snapshot.params['qId'];
    //this.question = this.questions[this.questionId];
    this.question = this.questionsService.questions[this.questionId];
    this.authUserAnswer = this.getAuthUserAnswer();
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

  getOptionOnePercent(): number {
    return Math.floor(
      //(this.question.optionOne.votes.length / Object.keys(this.users).length) * 100
      (this.question.optionOne.votes.length / Object.keys(this.usersService.users).length) * 100
    );
  }

  getOptionTwoPercent(): number {
    return Math.floor(
      //(this.question.optionTwo.votes.length / Object.keys(this.users).length) * 100
      (this.question.optionTwo.votes.length / Object.keys(this.usersService.users).length) * 100
    );
  }

  getAuthorName(): string {
    //return this.users[this.question.author].name;
    return this.usersService.users[this.question.author].name;
  }

  getAuthorAvatar(): string {
    //return this.users[this.question.author].avatarURL;
    return this.usersService.users[this.question.author].avatarURL;
  }

  getNumberOfUsers(): number {
    //return Object.keys(this.users).length;
    return Object.keys(this.usersService.users).length;
  }

  getSelectedOptionClass(option: string) {
    return {
      selectedOption: option === this.getAuthUserAnswer(),
    };
  }
}
