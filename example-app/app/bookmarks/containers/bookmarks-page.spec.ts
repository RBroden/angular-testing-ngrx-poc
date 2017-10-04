import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  fakeAsync, // only for handling output events
  tick, // only for handling output events
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { BookmarksPageComponent } from './bookmarks-page';

import * as fromBookmarks from '../bookmark-redux';
import {
  Bookmark,
  generateMockBookmarks,
  generateMockBookmark,
} from '../models/bookmark';

describe('BookmarksPageComponent', () => {
  let component: BookmarksPageComponent;
  let fixture: ComponentFixture<BookmarksPageComponent>;
  let store$: Store<any>;
  const mockBookmarks = generateMockBookmarks();
  const mockBookmark = generateMockBookmark();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ bookmarks: fromBookmarks.reducer })],
      declarations: [BookmarksPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksPageComponent);
    component = fixture.componentInstance;
    store$ = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should be readily instantiated', () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(store$).toBeDefined();
  });

  it(`should trigger LoadBookmarks action`, () => {
    spyOn(store$, 'dispatch');
    expect(store$.dispatch).not.toHaveBeenCalled();

    component.ngOnInit();
    expect(store$.dispatch).toHaveBeenCalledWith(
      new fromBookmarks.LoadAction()
    );
  });

  it('should load bookmarks', (done: DoneFn) => {
    store$.dispatch(new fromBookmarks.LoadSuccessAction(mockBookmarks));
    component.bookmarks$.subscribe(x => {
      expect(x.length).toBe(mockBookmarks.length);
      for (let i = 0; i < x.length; ++i) {
        expect(x[i]).toEqual(mockBookmarks[i]);
      }
      done();
    });
  });

  it(
    'handleFavorite() should call store',
    fakeAsync((done: DoneFn) => {
      spyOn(store$, 'dispatch');
      const mockBookmark = mockBookmarks[0];
      component.handleFavorite(mockBookmark);
      // detectChanges is not needed but tells a story
      // fakeAsync is nessecary for making this work
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(
        new fromBookmarks.FavoriteAction(mockBookmark.id)
      );
    })
  );
});
