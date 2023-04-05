import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from 'src/store/usersStore/users.effects';
import { UsersService } from 'src/store/usersStore/users.service';
import { QuestionsService } from 'src/store/questionsStore/questions.service';
import { QuestionsEffects } from 'src/store/questionsStore/questions.effects';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { ErrPageComponent } from './err-page/err-page.component';
import { AuthService } from 'src/store/authStore/auth.service';
import { AuthGuard } from './auth-guard.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { QuestionCardComponent } from './home/question-card/question-card.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { PollCardComponent } from './home/poll-card/poll-card.component';
import { ResultCardComponent } from './home/result-card/result-card.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { LeaderBoardItemComponent } from './leader-board/leader-board-item/leader-board-item.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    NewQuestionComponent,
    LeaderBoardComponent,
    ErrPageComponent,
    QuestionCardComponent,
    PollCardComponent,
    ResultCardComponent,
    LeaderBoardItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UsersEffects, QuestionsEffects]),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzCardModule,
    NzDropDownModule,
    NzTabsModule,
    NzAvatarModule,
    NzRadioModule,
    NzProgressModule,
    NzBadgeModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzDividerModule,
  ],
  providers: [
    UsersService,
    QuestionsService,
    AuthService,
    AuthGuard,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
