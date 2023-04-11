import { Injectable } from "@angular/core";
import { INewUserQuestion } from "src/models/INewQuestion";
import { IQuestionAnswer } from "src/models/IQuestionAnswer";
import { IUser } from "src/models/IUser";

@Injectable({
  providedIn: 'root'
})
export class Usersservice {
  users: { [key: string]: IUser } = {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL: 'assets/sarah.png',
      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo',
        am8ehyc8byjqgar0jgpub9: 'optionTwo',
        loxhs1bqm25b708cmbf3g: 'optionTwo',
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: 'assets/tyler.png',
      answers: {
        vthrdm985a262al8qx3do: 'optionOne',
        xj352vofupe1dqz9emx13r: 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    johndoe: {
      id: 'johndoe',
      name: 'John Doe',
      avatarURL: 'assets/john.png',
      answers: {
        xj352vofupe1dqz9emx13r: 'optionOne',
        vthrdm985a262al8qx3do: 'optionTwo',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
  };

  saveUserAnswer(userAnswer: IQuestionAnswer) {
    let newUsers: { [key: string]: IUser } = {
      ...this.users,
      [userAnswer.authUserId]: {
        ...this.users[userAnswer.authUserId],
        answers: {
          ...this.users[userAnswer.authUserId].answers,
          [userAnswer.qId]: userAnswer.answer,
        },
      },
    };
    this.users = newUsers;
  }

  saveUserQuestion(userQuestion: INewUserQuestion) {
    let newUsers: { [key: string]: IUser } = {
      ...this.users,
      [userQuestion.authorId]: {
        ...this.users[userQuestion.authorId],
        questions: this.users[userQuestion.authorId].questions.concat([
          userQuestion.questionId,
        ]),
      },
    };

    this.users = newUsers;
  }
}
