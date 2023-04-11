import { IQuestion } from "./IQuestion";

export interface INewQuestion {
  question: IQuestion;
  authorId: string
}

export interface INewUserQuestion {
  questionId: string;
  authorId: string;
}
