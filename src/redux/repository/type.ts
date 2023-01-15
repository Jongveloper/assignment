export interface IssuesUrlInfo {
  owner: string;
  repo: string;
}

export interface RepositoryInfo {
  id: number;
  full_name: string;
  updated_at: string;
  description: string;
  language?: string;
  stargazers_count?: number | string;
  circleColor: string;
  owner: string;
  repo: string;
}

export interface Repository {
  repositories: RepositoryInfo[];
  searchWord: string;
  page: number;
}
