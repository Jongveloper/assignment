import { Response } from '../types/Repository';

import { convertDateFormat } from './convertDateFormat';
import { kFormatter } from './kFormatter';
import { setCircleColor } from './setCircleColor';
import { convertIssueUrl } from './convertIssueUrl';

export const convertRepositories = (repositories: Response[]) => repositories.map(({
  id,
  full_name,
  updated_at,
  description,
  language,
  stargazers_count,
  issues_url,
} : Response) => {
  const data = {
    id,
    fullName: full_name,
    updatedAt: convertDateFormat(updated_at),
    description,
    language,
    stargazersCount: kFormatter(stargazers_count),
    circleColor: setCircleColor(language),
    owner: convertIssueUrl(issues_url).owner,
    repo: convertIssueUrl(issues_url).repo,
  };
  return data;
});
