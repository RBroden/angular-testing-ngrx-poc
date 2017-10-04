import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bookmark } from '../models/bookmark';

@Component({
  selector: 'bc-bookmark-list-item',
  template: `
        <div class="bookmark-list-item">
            <span class="bookmark-name">{{ bookmark.name }}</span>
            | <span class="bookmark-price">{{ bookmark.price | currency:"USD":true }}</span>
            |
            <button
                class="bookmark-favorite"
                (click)="handleFavorite(bookmark)">
                <3
            </button>
        </div>
    `,
})
export class BookmarkListItemComponent {
  @Input() bookmark: Bookmark;
  @Output() onFavorite = new EventEmitter<Bookmark>();

  handleFavorite(bookmark: Bookmark): void {
    this.onFavorite.emit(bookmark);
  }
}
