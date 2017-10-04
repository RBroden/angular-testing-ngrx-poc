import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryStoryService implements InMemoryDbService {
  // uncomment this function to force an error
  // protected get(interceptorArgs: HttpMethodInterceptorArgs) {
  //   let resp = createErrorResponse(500, 'this is a forced error from the in-memory api');
  //   return createObservableResponse(resp);
  // }

  /**
  * Creates fresh copy of data each time.
  * Safe for consuming service to morph arrays and objects.
  */
  createDb() {
    let bookmarks = [
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

    return { bookmarks };
  }
}
