export interface Bookmark {
  id: string;
  name: string;
  price: number;
}

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
const mockBookmark: Bookmark = mockBookmarks[0];

export function generateMockBookmarks(): Bookmark[] {
  return mockBookmarks;
}

export function generateMockBookmark(): Bookmark {
  return mockBookmark;
}
