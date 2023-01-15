import { IssuesUrlInfo, RepositoryInfo } from '../repository/type';

export interface Issue {
  user: string;
  title: string;
  body: string;
}

export interface Bookmark {
  issues: Issue[];
  repository: RepositoryInfo;
}

export interface loadIssueProps extends IssuesUrlInfo {
  repository: RepositoryInfo;
}
