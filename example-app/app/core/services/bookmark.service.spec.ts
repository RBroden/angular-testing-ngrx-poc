import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import {
  Http,
  HttpModule,
  BaseRequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { BookmarkService } from './bookmark.service';
import { Bookmark } from '../../bookmarks/models/bookmark';
import { ErrorMessage } from '../_models/error-message';

describe('BookmarkService', () => {
  let bookmarkService: BookmarkService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BookmarkService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (b: any, opts: any) => new Http(b, opts),
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });
  });

  beforeEach(
    inject(
      [BookmarkService, MockBackend],
      (service: BookmarkService, be: MockBackend) => {
        bookmarkService = service;
        backend = be;
      }
    )
  );

  const responseWith = (status: any, body: any, headers = null) => {
    return new Response(new ResponseOptions({ status, headers, body }));
  };

  const responseWithJSON = (status: any, body: any, headers = null) => {
    const json = JSON.stringify(body);
    return responseWith(status, json, headers);
  };

  it('should be instantiated', () => {
    expect(bookmarkService).toBeTruthy();
  });

  it('getBookmarks success should return array of bookmarks', () => {
    const mockResponse = {
      data: [
        { id: '1', name: 'Green Bookmark', price: 1.0 },
        { id: '2', name: 'Blue/Silver Bookmark', price: 2.0 },
        { id: '3', name: 'Gold Product', price: 5.0 },
      ],
    };
    const expectedResponse = mockResponse.data;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(200, mockResponse));
    });

    bookmarkService.getBookmarks().subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('getBookmarks error should return error message', () => {
    const mockErrorResponse = {
      data: <ErrorMessage>{
        code: 42,
        message: 'this is a mock error',
      },
    };
    const expectedResponse = mockErrorResponse.data;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(500, mockErrorResponse));
    });

    bookmarkService.getBookmarks().subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('getBookmark success should return array of bookmarks', () => {
    const mockResponse = {
      data: { id: '1', name: 'Green Bookmark', price: 1.0 },
    };
    const expectedResponse = mockResponse.data;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(200, mockResponse));
    });

    bookmarkService.getBookmark('1').subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('getBookmark error should return error message', () => {
    const mockErrorResponse = {
      data: <ErrorMessage>{
        code: 42,
        message: 'this is a mock error',
      },
    };
    const expectedResponse = mockErrorResponse.data;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(500, mockErrorResponse));
    });

    bookmarkService.getBookmark('1').subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('createBookmark success should return array of bookmarks', () => {
    const mockBookmark = { id: '5', name: 'Mock Bookmark', price: 100.0 };
    const mockResponse = {
      data: mockBookmark,
    };
    const expectedResponse = mockBookmark;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(200, mockResponse));
    });

    bookmarkService.createBookmark(mockBookmark).subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('createBookmark error should return error message', () => {
    const mockBookmark = { id: '5', name: 'Mock Bookmark', price: 100.0 };
    const mockErrorResponse = {
      data: <ErrorMessage>{
        code: 42,
        message: 'this is a mock error',
      },
    };
    const expectedResponse = mockErrorResponse.data;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(500, mockErrorResponse));
    });

    bookmarkService.createBookmark(mockBookmark).subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('updateBookmark success should return array of bookmarks', () => {
    const mockBookmark = { id: '5', name: 'Mock Bookmark', price: 100.0 };
    const mockResponse = {
      data: mockBookmark,
    };
    const expectedResponse = mockBookmark;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(200, mockResponse));
    });

    bookmarkService
      .updateBookmark(mockBookmark.id, mockBookmark)
      .subscribe((response: any) => {
        expect(response).toEqual(expectedResponse);
      });
  });

  it('updateBookmark error should return error message', () => {
    const mockBookmark = { id: '5', name: 'Mock Bookmark', price: 100.0 };
    const mockErrorResponse = {
      data: <ErrorMessage>{
        code: 42,
        message: 'this is a mock error',
      },
    };
    const expectedResponse = mockErrorResponse.data;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(500, mockErrorResponse));
    });

    bookmarkService
      .updateBookmark(mockBookmark.id, mockBookmark)
      .subscribe((response: any) => {
        expect(response).toEqual(expectedResponse);
      });
  });

  it('deleteBookmark success should return array of bookmarks', () => {
    const mockBookmark = { id: '5', name: 'Mock Bookmark', price: 100.0 };
    const mockResponse = {
      data: mockBookmark.id,
    };
    const expectedResponse = mockBookmark.id;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(200, mockResponse));
    });

    bookmarkService
      .deleteBookmark(mockBookmark.id)
      .subscribe((response: any) => {
        expect(response).toEqual(expectedResponse);
      });
  });

  it('deleteBookmark error should return error message', () => {
    const mockBookmark = { id: '5', name: 'Mock Bookmark', price: 100.0 };
    const mockErrorResponse = {
      data: <ErrorMessage>{
        code: 42,
        message: 'this is a mock error',
      },
    };
    const expectedResponse = mockErrorResponse.data;

    backend.connections.subscribe((connection: any) => {
      connection.mockRespond(responseWithJSON(500, mockErrorResponse));
    });

    bookmarkService
      .deleteBookmark(mockBookmark.id)
      .subscribe((response: any) => {
        expect(response).toEqual(expectedResponse);
      });
  });
});
