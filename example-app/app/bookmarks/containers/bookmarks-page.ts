import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromBookmarks from '../bookmark-redux';
import { Bookmark } from '../models/bookmark';

@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <h1>Bookmarks Container</h1>
        <bc-bookmark-list
            [bookmarks]="bookmarks$ | async"
            [loading]="loading$ | async"
            (onFavorite)="handleFavorite($event)">
        </bc-bookmark-list>
    `,
})
export class BookmarksPageComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;
  loading$: Observable<boolean>;
  showData: any;

  constructor(private store$: Store<fromBookmarks.State>) {
    this.bookmarks$ = store$.select(fromBookmarks.getAllBookmarks);
    this.loading$ = store$.select(fromBookmarks.getBookmarkLoading);
  }

  ngOnInit() {
    this.store$.dispatch(new fromBookmarks.LoadAction());
  }

  handleFavorite(bookmark: Bookmark): void {
    this.store$.dispatch(new fromBookmarks.FavoriteAction(bookmark.id));
  }
}
