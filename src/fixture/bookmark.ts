import { Bookmark } from '../redux/bookmark/type';

export const bookmark: Bookmark = {
  repository: {
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
  issues: [{
    user: 'tester1',
    title: 'Issue',
    body: 'IssueBody',
    url: 'testUrl',
  },
  {
    user: 'tester2',
    title: 'Issue2',
    body: 'IssueBody2',
    url: 'testUrl2',
  },
  {
    user: 'tester3',
    title: 'Issue3',
    body: 'IssueBody3',
    url: 'testUrl3',
  }],
};
