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
        <bc-bookmark-list-item
            #component
            [bookmark]="bookmark">
        </bc-bookmark-list-item>
    `,
})
class TestHostComponent {
  @ViewChild('component') component: BookmarkListItemComponent;
  bookmark: Bookmark = mockBookmark;
}

describe('BookmarkListComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: BookmarkListItemComponent;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarkListItemComponent, TestHostComponent],
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

  it('should have the bookmark', () => {
    expect(component.bookmark).toEqual(mockBookmark);
  });

  it('should display bookmark', () => {
    const listItem = debugElement.query(By.css('.bookmark-list-item'));
    const listItemName = listItem.query(By.css('.bookmark-name')).nativeElement;
    const listItemPrice = listItem.query(By.css('.bookmark-price'))
      .nativeElement;
    expect(listItemName.textContent).toEqual(mockBookmark.name);
    expect(listItemPrice.textContent).toContain(mockBookmark.price);
  });

  it('should emit event when favorite button clicked', (done: DoneFn) => {
    const listItem = debugElement.query(By.css('.bookmark-list-item'));
    const listItemFavoriteButton = listItem.query(By.css('.bookmark-favorite'));
    const expected = mockBookmark;
    // subscribe to EventEmitter<dataType>, use data being transmitted
    component.onFavorite.subscribe((bookmark: Bookmark) => {
      // effect - bookmark event is emitted, should be
      expect(bookmark).toEqual(expected);
      done();
    });
    // cause - user click
    listItemFavoriteButton.triggerEventHandler('click', null);
  });
});
