import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';

import { BookmarkService } from '../../core/services/bookmark.service';
import * as bookmark from '../actions/bookmark';
import { Bookmark } from '../models/bookmark';

@Injectable()
export class BookmarkEffects {
  @Effect()
  loadBookmarks$: Observable<Action> = this.actions$
    .ofType<bookmark.LoadAction>(bookmark.LOAD)
    .switchMap(() => {
      return this.bookmarkService
        .getBookmarks()
        .map(
          (bookmarks: Bookmark[]) => new bookmark.LoadSuccessAction(bookmarks)
        )
        .catch((error: any) => of(new bookmark.LoadFailureAction(error)));
    });

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService
  ) {}
}
