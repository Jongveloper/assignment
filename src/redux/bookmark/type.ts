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
}

export interface loadIssueProps extends IssuesUrlInfo {
  repository: RepositoryInfo;
}
