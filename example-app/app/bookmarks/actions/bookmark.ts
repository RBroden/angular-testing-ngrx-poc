import { Action } from '@ngrx/store';
import { Bookmark } from '../models/bookmark';
import { ErrorMessage } from '../../core/_models/error-message';

const prefix = '[Bookmark] ';

export const LOAD = prefix + 'Load';
export const LOAD_SUCCESS = prefix + 'Load Success';
export const LOAD_FAILURE = prefix + 'Load Failure';
export const LOAD_ITEM = prefix + 'Load Item';
export const LOAD_ITEM_SUCCESS = prefix + 'Load Item Success';
export const LOAD_ITEM_FAILURE = prefix + 'Load Item Failure';
export const CREATE = prefix + 'Create';
export const CREATE_SUCCESS = prefix + 'Create Success';
export const CREATE_FAILURE = prefix + 'Create Failure';
export const UPDATE = prefix + 'Update';
export const UPDATE_SUCCESS = prefix + 'Update Success';
export const UPDATE_FAILURE = prefix + 'Update Failure';
export const DELETE = prefix + 'Delete';
export const DELETE_SUCCESS = prefix + 'Delete Success';
export const DELETE_FAILURE = prefix + 'Delete Failure';
export const SELECT = prefix + 'Select';
export const FAVORITE = prefix + 'Favorite';

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload?: void) {}
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Bookmark[]) {}
}

export class LoadFailureAction implements Action {
  readonly type = LOAD_FAILURE;
  constructor(public payload: ErrorMessage) {}
}

export class LoadItemAction implements Action {
  readonly type = LOAD_ITEM;
  constructor(public payload?: void) {}
}

export class LoadItemSuccessAction implements Action {
  readonly type = LOAD_ITEM_SUCCESS;
  constructor(public payload: Bookmark) {}
}

export class LoadItemFailureAction implements Action {
  readonly type = LOAD_ITEM_FAILURE;
  constructor(public payload: ErrorMessage) {}
}

export class CreateAction implements Action {
  readonly type = CREATE;
  constructor(public payload?: void) {}
}

export class CreateSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Bookmark) {}
}

export class CreateFailureAction implements Action {
  readonly type = CREATE_FAILURE;
  constructor(public payload: ErrorMessage) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE;
  constructor(public payload?: void) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: Bookmark) {}
}

export class UpdateFailureAction implements Action {
  readonly type = UPDATE_FAILURE;
  constructor(public payload: ErrorMessage) {}
}

export class DeleteAction implements Action {
  readonly type = DELETE;
  constructor(public payload?: void) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteFailureAction implements Action {
  readonly type = DELETE_FAILURE;
  constructor(public payload: ErrorMessage) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export class FavoriteAction implements Action {
  readonly type = FAVORITE;
  constructor(public payload: string) {}
}

export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailureAction
  | LoadItemAction
  | LoadItemSuccessAction
  | LoadItemFailureAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  | SelectAction
  | FavoriteAction;
