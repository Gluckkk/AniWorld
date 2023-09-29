export interface GetKpisResponse {
  _id: string;
  username: string;
  email: string;
  password: string;
  bookmarks: Array<string>;
  watched: Array<string>;
  watchLater: Array<string>;
  __v: number;
}
