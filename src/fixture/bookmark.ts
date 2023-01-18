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

export const bookmarks = [
  {
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
  },
  {
    repository: {
      id: 2,
      fullName: 'tester2',
      updatedAt: '2023-01-11',
      description: 'testing2',
      language: 'JavaScript',
      stargazersCount: '234',
      circleColor: 'yellow',
      owner: 'owner2',
      repo: 'repo2',
    },
    issues: [{
      user: 'tester12',
      title: 'Issue2',
      body: 'IssueBody2',
      url: 'testUrl2',
    },
    {
      user: 'tester22',
      title: 'Issue22',
      body: 'IssueBody22',
      url: 'testUrl22',
    },
    {
      user: 'tester33',
      title: 'Issue33',
      body: 'IssueBody33',
      url: 'testUrl33',
    }],
  },
];
