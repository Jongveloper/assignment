import { Bookmarks } from "../redux/bookmark/type";

import { RepositoryInfo } from '../redux/repository/type';

import store from '../redux/store';

export const duplicateDetection = (repository: RepositoryInfo) => {
  const bookmarks = store.getState().bookmark.bookmarks as Bookmarks[];

  return bookmarks.some((bookmark) => bookmark.repository.id === repository.id);
};
