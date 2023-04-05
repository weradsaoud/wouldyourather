import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IUser } from 'src/models/IUser';
import { selectUsers } from 'src/store/usersStore/users.selectors';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css'],
})
export class LeaderBoardComponent {
  users: IUser[];

  constructor(private store: Store<IAppState>) {
    this.store.select(selectUsers).subscribe((users) => {
      let usersIds = Object.keys(users);
      this.users = usersIds.map((userId) => users[userId]);
    });
  }

  getAnswersNumber(user: IUser): number {
    return Object.keys(user.answers).length;
  }

  sortUsers(): IUser[] {
    return this.users.sort((a, b) => {
      let aScore = a.questions.length + this.getAnswersNumber(a);
      let bScore = b.questions.length + this.getAnswersNumber(b);
      if (aScore > bScore) return -1;
      if (aScore < bScore) return 1;
      return 0;
    });
  }
}
