import { DialogType } from "../common";

import { IssuesUrlInfo, RepositoryInfo } from "../repository/type";

export interface Issue {
  user: string;
  title: string;
  body: string;
}

export interface Bookmarks {
  issues: Issue[];
  repository: RepositoryInfo;
}

export interface Bookmark {
  bookmarks: Bookmarks[] | string;
  dialog: DialogType;
}

export interface loadIssueProps extends IssuesUrlInfo {
  repository: RepositoryInfo;
}
