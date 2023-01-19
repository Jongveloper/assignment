import { Issue } from '../types/Issue';

export const convertIssue = (issues: Issue[]) => issues
  .filter(({ html_url }: Issue) => {
    const splitUrl = html_url.split('/');

    if (splitUrl[splitUrl.length - 2] === 'issues') {
      return issues;
    }
  }).map(({
    user: { login },
    title,
    body,
    html_url,
  }: Issue) => ({
    user: login,
    title,
    body,
    url: html_url,
  }));
