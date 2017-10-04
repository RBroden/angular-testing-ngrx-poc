import { BookmarkListComponent } from './bookmark-list.component';
import { BookmarkListItemComponent } from './bookmark-list-item.component';
import {
  Component,
  ViewChild,
  NO_ERRORS_SCHEMA,
  DebugElement,
} from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Bookmark } from '../models/bookmark';

const mockBookmarks: Bookmark[] = [
  {
    id: '1',
    name: 'Green Bookmark',
    price: 1.0,
  },
  {
    id: '2',
    name: 'Blue/Silver Bookmark',
    price: 2.0,
  },
  {
    id: '3',
    name: 'Gold Product',
    price: 5.0,
  },
];
const mockBookmark = mockBookmarks[0];

@Component({
  template: `
        <bc-bookmark-list
            #component
            [bookmarks]="bookmarks">
        </bc-bookmark-list>
    `,
})
class TestHostComponent {
  @ViewChild('component') component: BookmarkListComponent;
  bookmarks: Bookmark[] = mockBookmarks;
}

describe('BookmarkListComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: BookmarkListComponent;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookmarkListComponent,
        BookmarkListItemComponent,
        TestHostComponent,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = host.component;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should be readily instantiated', () => {
    expect(fixture).toBeDefined();
    expect(host).toBeDefined();
    expect(component).toBeDefined();
  });

  it('should have the bookmarks', () => {
    expect(component.bookmarks).toEqual(mockBookmarks);
  });

  it('should display bookmarks', () => {
    const listItems = debugElement.queryAll(
      By.css('.bookmark-list-item-container')
    );
    expect(listItems.length).toBe(mockBookmarks.length);
  });

  it('should emit event if bookmark list item emits onFavorite()', (
    done: DoneFn
  ) => {
    const listItem = debugElement.query(
      By.css('.bookmark-list-item-container')
    );
    const listItemComponent: BookmarkListItemComponent =
      listItem.componentInstance;
    component.onFavorite.subscribe((bookmark: Bookmark) => {
      expect(bookmark).toBe(mockBookmark);
      done();
    });
    listItemComponent.onFavorite.emit(mockBookmark);
  });
});
