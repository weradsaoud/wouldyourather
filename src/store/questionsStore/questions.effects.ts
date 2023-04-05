import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { IAppState } from 'src/models/IAppState';

import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { QuestionsService } from './questions.service';
import { loadQuestions, saveQuestions } from './questions.actions';

@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private questionsService: QuestionsService
  ) {}

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestions),
      switchMap(() =>
        from(this.questionsService.getQuestions()).pipe(
          map((questions) => saveQuestions({ questions: questions }))
        )
      )
    )
  );
}
