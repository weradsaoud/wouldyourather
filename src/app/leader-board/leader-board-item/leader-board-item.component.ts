import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leader-board-item',
  templateUrl: './leader-board-item.component.html',
  styleUrls: ['./leader-board-item.component.css'],
})
export class LeaderBoardItemComponent {
  @Input() userName: string;
  @Input() avatar: string;
  @Input() answeredQuestionsNumber: number;
  @Input() askedQuestionsNumber: number;
}
