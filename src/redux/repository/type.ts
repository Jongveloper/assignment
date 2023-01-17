export interface IssuesUrlInfo {
  owner: string;
  repo: string;
  page?: number;
}

export interface RepositoryInfo {
  id: number;
  fullName: string;
  updatedAt: string;
  description: string;
  language?: string;
  stargazersCount?: number | string;
  circleColor: string;
  owner: string;
  repo: string;
}
