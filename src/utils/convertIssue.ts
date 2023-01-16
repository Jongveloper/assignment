import { Issue } from '../types/Issue';

export const convertIssue = (issues: Issue[]) => issues.map(({
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
