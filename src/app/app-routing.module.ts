import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { ErrPageComponent } from './err-page/err-page.component';
import { HomeComponent } from './home/home.component';
import { PollCardComponent } from './home/poll-card/poll-card.component';
import { ResultCardComponent } from './home/result-card/result-card.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { LogInComponent } from './log-in/log-in.component';
import { NewQuestionComponent } from './new-question/new-question.component';

const routes: Routes = [
  { path: '', component: LogInComponent },
  {
    path: 'home/result/:qId',
    canActivate: [AuthGuard],
    component: ResultCardComponent,
  },
  { path: 'home/:qId', canActivate: [AuthGuard], component: PollCardComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'newquestion',
    canActivate: [AuthGuard],
    component: NewQuestionComponent,
  },
  {
    path: 'leaderboard',
    canActivate: [AuthGuard],
    component: LeaderBoardComponent,
  },

  {
    path: 'not-found',
    component: ErrPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
