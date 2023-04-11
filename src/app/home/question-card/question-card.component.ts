import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/models/IAppState';
import { IUser } from 'src/models/IUser';
import { Usersservice } from 'src/services/users.service';
import { selectUsers } from 'src/store/usersStore/users.selectors';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardComponent implements OnInit {
  users: { [key: string]: IUser };
  @Input() authorId: string = '';
  @Input() optionOne: string = '';
  @Input() optionTwo: string = '';
  @Input() questionId: string = '';

  constructor(
    //private store: Store<IAppState>,
    private usersService: Usersservice,
    private router: Router
  ) {
    //this.store.select(selectUsers).subscribe((users) => (this.users = users));
  }
  ngOnInit(): void {
    this.users = this.usersService.users;
  }

  getAuthorName(): string {
    return this.users[this.authorId].name;
  }

  getAuthorAvatar(): string {
    return this.users[this.authorId].avatarURL;
  }

  viewPoll() {
    console.log('this.questionId: ', this.questionId);

    this.router.navigate(['/home', this.questionId]);
  }
}
