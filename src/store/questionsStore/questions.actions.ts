import { createAction, props } from '@ngrx/store';
import { IQuestion } from 'src/models/IQuestion';

export const saveQuestions = createAction(
  '[Initialize App] SaveQuestions',
  props<{ questions: { [key: string]: IQuestion } }>()
);

export const loadQuestions = createAction('[Initialize App] LoadQuestions');
export const saveQuestionAnswer = createAction(
  '[Poll Component] SaveQuestionAnswer',
  props<{ authUserId: string; qId: string; answer: string }>()
);
export const saveQuestion = createAction(
  '[NewQuestion Component] SaveQuestion',
  props<{ question: IQuestion; authorId: string }>()
);
