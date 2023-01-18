import { Bookmark } from '../redux/bookmark/type';

export const notExistBookmark: Bookmark = {
  repository: {
    id: 5,
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

export const maxBookmarks = [
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
  {
    repository: {
      id: 3,
      fullName: 'tester3',
      updatedAt: '2023-01-18',
      description: 'testing',
      language: 'JavaScript',
      stargazersCount: '233',
      circleColor: 'yellow',
      owner: 'owner3',
      repo: 'repo3',
    },
    issues: [{
      user: 'tester13',
      title: 'Issue3',
      body: 'IssueBody3',
      url: 'testUrl3',
    },
    {
      user: 'tester23',
      title: 'Issue23',
      body: 'IssueBody23',
      url: 'testUrl23',
    },
    {
      user: 'tester33',
      title: 'Issue33',
      body: 'IssueBody33',
      url: 'testUrl33',
    }],
  },
  {
    repository: {
      id: 4,
      fullName: 'tester24',
      updatedAt: '2023-01-11',
      description: 'testing4',
      language: 'JavaScript',
      stargazersCount: '2344',
      circleColor: 'yellow',
      owner: 'owner4',
      repo: 'repo24',
    },
    issues: [{
      user: 'tester124',
      title: 'Issue2',
      body: 'IssueBody24',
      url: 'testUrl24',
    },
    {
      user: 'tester224',
      title: 'Issue224',
      body: 'IssueBody224',
      url: 'testUrl224',
    },
    {
      user: 'tester334',
      title: 'Issue334',
      body: 'IssueBody334',
      url: 'testUrl334',
    }],
  },
];

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
