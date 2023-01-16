import { Issue } from '../types/Issue';

export const convertIssue = (issues: Issue[]) => {
  const filteredIssue = issues.filter(({
    html_url,
  }: Issue) => {
    const splitUrl = html_url.split('/');

    if (splitUrl[splitUrl.length - 2] === 'issues') {
      return issues;
    }
  });

  const processedIssue = filteredIssue.map(({
    user: { login },
    title,
    body,
    html_url,
  }: Issue) => {
    const data = {
      user: login, title, body, url: html_url,
    };

    return data;
  });

  return processedIssue;
};
