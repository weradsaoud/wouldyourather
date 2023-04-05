import { createReducer, on } from '@ngrx/store';
import { IQuestion } from 'src/models/IQuestion';
import { IQuestionsState } from 'src/models/IQuestionsState';
import {
  loadQuestions,
  saveQuestion,
  saveQuestionAnswer,
  saveQuestions,
} from './questions.actions';

export const initialState: IQuestionsState = {
  questions: {},
  loadingQuestions: false,
};

export const questionsReducer = createReducer(
  initialState,

  on(saveQuestions, (state, { questions }) => {
    return {
      ...state,
      questions: { ...questions },
      loadingQuestions: false,
    };
  }),

  on(saveQuestionAnswer, (state, payload) => {
    let newQuestions: { [key: string]: IQuestion };
    console.log('oldQuestions: ', state.questions);

    if (payload.answer === 'optionOne') {
      newQuestions = {
        ...state.questions,
        [payload.qId]: {
          ...state.questions[payload.qId],
          optionOne: {
            ...state.questions[payload.qId].optionOne,
            votes: state.questions[payload.qId].optionOne.votes.concat(
              payload.authUserId
            ),
          },
        },
      };
    } else {
      newQuestions = {
        ...state.questions,
        [payload.qId]: {
          ...state.questions[payload.qId],
          optionTwo: {
            ...state.questions[payload.qId].optionTwo,
            votes: state.questions[payload.qId].optionTwo.votes.concat(
              payload.authUserId
            ),
          },
        },
      };
    }
    console.log('newQuestions: ', newQuestions);

    return {
      ...state,
      questions: newQuestions,
    };
  }),

  on(saveQuestion, (state, payload) => {
    let newQuestions: { [key: string]: IQuestion } = {
      ...state.questions,
      [payload.question.id]: payload.question,
    };

    return {
      ...state,
      questions: newQuestions,
    };
  }),

  on(loadQuestions, (state) => {
    return {
      ...state,
      loadingQuestions: true,
    };
  })
);
