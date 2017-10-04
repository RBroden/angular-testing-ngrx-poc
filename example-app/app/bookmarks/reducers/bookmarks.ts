import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Bookmark } from '../models/bookmark';
import * as bookmark from '../actions/bookmark';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Bookmark> {
  loaded: boolean;
  loading: boolean;
  selectedBookmarkId: string | null;
  favorites: string[];
  newBookmarkInfo: {
    isCreating: boolean;
    error: any;
  };
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>({
  selectId: (bookmark: Bookmark) => bookmark.id,
  sortComparer: false,
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
*/
export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedBookmarkId: null,
  favorites: [],
  newBookmarkInfo: {
    isCreating: false,
    error: null,
  },
});

export function reducer(state = initialState, action: bookmark.Actions): State {
  switch (action.type) {
    case bookmark.LOAD: {
      return {
        ...state,
        loading: true,
      };
    }

    case bookmark.LOAD_SUCCESS: {
      return {
        ...state,
        /**
                 * The addMany function provided by the created adapter
                 * adds many records to the entity dictionary
                 * and returns a new state including those records. If
                 * the collection is to be sorted, the adapter will
                 * sort each record upon entry into the sorted array.
                 */
        ...adapter.addMany(<Bookmark[]>action.payload, state),
        loading: false,
        loaded: true,
        selectedBookmarkId: state.selectedBookmarkId,
      };
    }

    case bookmark.CREATE: {
      return {
        ...state,
        newBookmarkInfo: {
          ...state.newBookmarkInfo,
          isCreating: true,
        },
      };
    }

    case bookmark.CREATE_SUCCESS: {
      return {
        ...state,
        ...adapter.addOne(<Bookmark>action.payload, state),
        newBookmarkInfo: {
          isCreating: false,
          error: null,
        },
      };
    }

    case bookmark.FAVORITE: {
      return {
        ...state,
        favorites: [...state.favorites, <string>action.payload],
      };
    }

    default: {
      return state;
    }
  }
}

export const getBookmarksState = createFeatureSelector<State>('bookmarks');

export const {
  selectIds: getBookmarkIds,
  selectEntities: getBookmarkEntities,
  selectAll: getAllBookmarks,
} = adapter.getSelectors(getBookmarksState);

export const getBookmarkLoading = createSelector(
  getBookmarksState,
  (state: State) => state.loading
);

export const getBookmarkLoaded = createSelector(
  getBookmarksState,
  (state: State) => state.loaded
);
