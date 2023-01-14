export const convertIssueUrl = (url: string) => {
  const splitUrl = url.split('{')[0].split('/');

  return { owner: splitUrl[splitUrl.length - 3], repo: splitUrl[splitUrl.length - 2] };
};
