import { reducer } from './bookmarks';
import * as fromBookmarks from './bookmarks';
import * as bookmark from '../actions/bookmark';
import {
  Bookmark,
  generateMockBookmarks,
  generateMockBookmark,
} from '../models/bookmark';

describe('BookmarksReducer', () => {
  const mockBookmarks = generateMockBookmarks();
  const mockBookmark = generateMockBookmark();
  const mockBookmarksIds = mockBookmarks.map((bookmark: Bookmark) => {
    return bookmark.id;
  });
  const initialState: fromBookmarks.State = {
    ...fromBookmarks.initialState,
    // ids: mockBookmarksIds,
    // ...fromBookmarks.adapter.addMany(mockBookmarks, fromBookmarks.initialState)
  };

  it('should return the default state', () => {
    const result = reducer(undefined, {} as any);
    expect(result).toEqual(fromBookmarks.initialState);
  });

  it('LoadAction changes loading to true', () => {
    const expectedState = {
      ...initialState,
      loading: true,
    };
    const newState = reducer(initialState, new bookmark.LoadAction());
    expect(newState).toEqual(expectedState);
  });

  it('LoadAction changes loading to true', () => {
    // let mockEntities: any = {};
    // mockEntities[mockBookmark.id] = mockBookmark;
    const expectedState = {
      ...initialState,
      // ids: [mockBookmark.id],
      // entities: mockEntities,
      ...fromBookmarks.adapter.addOne(mockBookmark, fromBookmarks.initialState),
    };
    const newState = reducer(
      initialState,
      new bookmark.CreateSuccessAction(mockBookmark)
    );
    expect(newState).toEqual(expectedState);
  });
});
