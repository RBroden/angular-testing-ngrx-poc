import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bookmark } from '../models/bookmark';

@Component({
  selector: 'bc-bookmark-list',
  template: `
        Bookmark List
        <pre>{{ loading }}</pre>
        <bc-bookmark-list-item
            *ngFor="let bookmark of bookmarks"
            class="bookmark-list-item-container"
            [bookmark]="bookmark"
            (onFavorite)="handleFavorite($event)">
        </bc-bookmark-list-item>
    `,
})
export class BookmarkListComponent {
  @Input() bookmarks: Bookmark[];
  @Input() loading: boolean;
  @Output() onFavorite = new EventEmitter<Bookmark>();

  handleFavorite(bookmark: Bookmark) {
    this.onFavorite.emit(bookmark);
  }
}
