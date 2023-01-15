import { Issue } from "../types/Issue";

export const convertIssue = (issues: Issue[]) => issues.map(({
  user:{ login },
  title,
  body
}: Issue) => {
  const data = { user : login, title, body }

  return data;
})
