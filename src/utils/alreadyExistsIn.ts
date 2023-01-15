import { Bookmark } from '../redux/bookmark/type';

import { RepositoryInfo } from '../redux/repository/type';

export const alreadyExistsIn = (
  bookmarks: Bookmark[],
  repository: RepositoryInfo,
) => bookmarks.some((bookmark) => bookmark.repository.id === repository.id);
