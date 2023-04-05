export interface IQuestion {
  id: string;
  author: string;
  timestamp: number,
  optionOne: {
    votes: string[],
    text: string,
  },
  optionTwo: {
    votes: string[],
    text: string
  }
}
