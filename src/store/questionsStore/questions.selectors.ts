import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IQuestionsState } from 'src/models/IQuestionsState';

export const selectQuestionsState = (state: IAppState) => state.questionsState;

export const selectQuestions = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.questions
);

export const selectLoadingQuestions = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loadingQuestions
);
