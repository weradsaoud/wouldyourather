import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IQuestion } from 'src/models/IQuestion';
import { IUser } from 'src/models/IUser';
import { AuthService } from 'src/services/auth.service';
import { QuestionsService } from 'src/services/questions.service';
import { Usersservice } from 'src/services/users.service';
import { selectAuth } from 'src/store/authStore/auth.selectors';
import { saveQuestion } from 'src/store/questionsStore/questions.actions';
import { saveUserQuestion } from 'src/store/usersStore/users.actions';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent {
  authUser: IUser;
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    //private store: Store<IAppState>,
    private authService: AuthService,
    private usersService: Usersservice,
    private questionsService: QuestionsService,
    private router: Router
  ) {
    // this.store.select(selectAuth).subscribe((user) => {
    //   this.authUser = user;
    // });
  }

  ngOnInit(): void {
    this.authUser = this.authService.loggedInUser;
    this.validateForm = this.fb.group({
      optionOne: [null, [Validators.required]],
      optionTwo: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      let newQuestion = this.formatQuestion(
        this.validateForm.value.optionOne,
        this.validateForm.value.optionTwo,
        this.authUser.id
      );
      // this.store.dispatch(
      //   saveQuestion({
      //     question: newQuestion,
      //     authorId: this.authUser.id,
      //   })
      // );
      // this.store.dispatch(
      //   saveUserQuestion({
      //     questionId: newQuestion.id,
      //     authorId: this.authUser.id,
      //   })
      // );
      this.questionsService.saveQuestion({
        question: newQuestion,
        authorId: this.authUser.id,
      });
      this.usersService.saveUserQuestion({
        questionId: newQuestion.id,
        authorId: this.authUser.id,
      });
      this.router.navigate(['home']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  formatQuestion(
    optionOneText: string,
    optionTwoText: string,
    authorId: string
  ): IQuestion {
    return {
      id: this.generateUID(),
      timestamp: Date.now(),
      author: authorId,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      },
    };
  }

  generateUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
