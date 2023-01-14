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
    full_name,
    updated_at: convertDateFormat(updated_at),
    description,
    language,
    stargazers_count: kFormatter(stargazers_count),
    circleColor: setCircleColor(language),
    issues_url: convertIssueUrl(issues_url),
  };
  return data;
});
