import { RepositoryInfo } from '../redux/repository/type';

import { Issue } from '../redux/bookmark/type';

export const localStorageSetBookmark = (issues: Issue[], repository: RepositoryInfo) => {
  const bookmark = localStorage.getItem('bookmark');

  if (bookmark === null) {
    localStorage.setItem('bookmark', JSON.stringify([{ repository, issues }]));

    return;
  }

  localStorage.setItem('bookmark', JSON.stringify([...JSON.parse(bookmark), { repository, issues }]));
};
