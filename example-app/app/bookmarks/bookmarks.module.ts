import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookmarksPageComponent } from './containers/bookmarks-page';
import { BookmarkListComponent } from './components/bookmark-list.component';
import { BookmarkListItemComponent } from './components/bookmark-list-item.component';

import { reducer } from './reducers/bookmarks';
import { BookmarkEffects } from './effects/bookmark';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: BookmarksPageComponent }]),
    StoreModule.forFeature('bookmarks', reducer),
    EffectsModule.forFeature([BookmarkEffects]),
  ],
  declarations: [
    BookmarksPageComponent,
    BookmarkListComponent,
    BookmarkListItemComponent,
  ],
  // providers: [BookExistsGuard],
})
export class BookmarksModule {}
