import { RepositoryInfo } from '../redux/repository/type';

export const repositories: RepositoryInfo[] = [
  {
    id: 1,
    fullName: 'tester',
    updatedAt: '2023-01-18',
    description: 'testing',
    language: 'JavaScript',
    stargazersCount: '23',
    circleColor: 'yellow',
    owner: 'owner',
    repo: 'repo',
  },
  {
    id: 2,
    fullName: 'tester2',
    updatedAt: '2023-01-22',
    description: 'testing2',
    language: 'JavaScript',
    stargazersCount: '232',
    circleColor: 'yellow',
    owner: 'owner2',
    repo: 'repo2',
  },
];
