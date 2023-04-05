import { IQuestion } from './IQuestion';

export interface IQuestionsState {
  questions: { [key: string]: IQuestion };
  loadingQuestions: boolean;
}
