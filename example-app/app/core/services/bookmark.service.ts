import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Bookmark } from '../../bookmarks/models/bookmark';

@Injectable()
export class BookmarkService {
  private bookmarksUrl = 'api/bookmarks';

  constructor(private http: Http) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http
      .get(this.bookmarksUrl)
      .map(response => response.json().data as Bookmark[])
      .catch(this.handleError);
  }

  getBookmark(id: string): Observable<Bookmark> {
    return this.http
      .get(`${this.bookmarksUrl}/${id}`)
      .map(response => response.json().data as Bookmark)
      .catch(this.handleError);
  }

  createBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http
      .post(`${this.bookmarksUrl}`, bookmark)
      .map(response => response.json().data as Bookmark)
      .catch(this.handleError);
  }

  updateBookmark(id: string, bookmark: Bookmark): Observable<Bookmark> {
    return this.http
      .put(`${this.bookmarksUrl}/${id}`, bookmark)
      .map(response => response.json().data as Bookmark)
      .catch(this.handleError);
  }

  deleteBookmark(id: string): Observable<string> {
    return this.http
      .delete(`${this.bookmarksUrl}/${id}`)
      .map(response => response.json().data as string)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
}
