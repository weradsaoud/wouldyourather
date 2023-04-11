import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IUser } from 'src/models/IUser';
import { Usersservice } from 'src/services/users.service';
import { selectUsers } from 'src/store/usersStore/users.selectors';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css'],
})
export class LeaderBoardComponent implements OnInit {
  users: IUser[];

  constructor(
    //private store: Store<IAppState>
    private usersService: Usersservice
  ) {
    // this.store.select(selectUsers).subscribe((users) => {
    //   let usersIds = Object.keys(users);
    //   this.users = usersIds.map((userId) => users[userId]);
    // });
  }
  ngOnInit(): void {
    let usersIds = Object.keys(this.usersService.users);
    this.users = usersIds.map((userId) => this.usersService.users[userId]);
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
