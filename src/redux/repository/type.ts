export interface IssuesUrlInfo {
  owner: string;
  repo: string;
  page?: number;
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
