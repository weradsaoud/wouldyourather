import { Injectable } from "@angular/core";
import { INewQuestion } from "src/models/INewQuestion";
import { IQuestion } from "src/models/IQuestion";
import { IQuestionAnswer } from "src/models/IQuestionAnswer";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questions: { [key: string]: IQuestion } = {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'sarahedo',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['sarahedo'],
        text: 'have horrible short term memory',
      },
      optionTwo: {
        votes: [] as string[],
        text: 'have horrible long term memory'
      }
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'johndoe',
      timestamp: 1468479767190,
      optionOne: {
        votes: [] as string[],
        text: 'become a superhero',
      },
      optionTwo: {
        votes: ['johndoe', 'sarahedo'],
        text: 'become a supervillain'
      }
    },
    "am8ehyc8byjqgar0jgpub9": {
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'sarahedo',
      timestamp: 1488579767190,
      optionOne: {
        votes: [] as string[],
        text: 'be telekinetic',
      },
      optionTwo: {
        votes: ['sarahedo'],
        text: 'be telepathic'
      }
    },
    "loxhs1bqm25b708cmbf3g": {
      id: 'loxhs1bqm25b708cmbf3g',
      author: 'tylermcginnis',
      timestamp: 1482579767190,
      optionOne: {
        votes: [] as string[],
        text: 'be a front-end developer',
      },
      optionTwo: {
        votes: ['sarahedo'],
        text: 'be a back-end developer'
      }
    },
    "vthrdm985a262al8qx3do": {
      id: 'vthrdm985a262al8qx3do',
      author: 'tylermcginnis',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['tylermcginnis'],
        text: 'find $50 yourself',
      },
      optionTwo: {
        votes: ['johndoe'],
        text: 'have your best friend find $500'
      }
    },
    "xj352vofupe1dqz9emx13r": {
      id: 'xj352vofupe1dqz9emx13r',
      author: 'johndoe',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['johndoe'],
        text: 'write JavaScript',
      },
      optionTwo: {
        votes: ['tylermcginnis'],
        text: 'write Swift'
      }
    },
  };

  saveQuestionAnswer(questionAnswer: IQuestionAnswer) {
    let newQuestions: { [key: string]: IQuestion };
    console.log('oldQuestions: ', this.questions);

    if (questionAnswer.answer === 'optionOne') {
      newQuestions = {
        ...this.questions,
        [questionAnswer.qId]: {
          ...this.questions[questionAnswer.qId],
          optionOne: {
            ...this.questions[questionAnswer.qId].optionOne,
            votes: this.questions[questionAnswer.qId].optionOne.votes.concat(
              questionAnswer.authUserId
            ),
          },
        },
      };
    } else {
      newQuestions = {
        ...this.questions,
        [questionAnswer.qId]: {
          ...this.questions[questionAnswer.qId],
          optionTwo: {
            ...this.questions[questionAnswer.qId].optionTwo,
            votes: this.questions[questionAnswer.qId].optionTwo.votes.concat(
              questionAnswer.authUserId
            ),
          },
        },
      };
    }
    console.log('newQuestions: ', newQuestions);

    this.questions = newQuestions;
  }

  saveQuestion(newQuestion: INewQuestion) {
    let newQuestions: { [key: string]: IQuestion } = {
      ...this.questions,
      [newQuestion.question.id]: newQuestion.question,
    };

    this.questions = newQuestions;
  }
}
