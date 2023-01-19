import { convertIssueUrl } from './convertIssueUrl';

describe('convertIssueUrl', () => {
  it('owner와 repo가 리턴됩니다.', () => {
    expect(
      convertIssueUrl('https://api.github.com/repos/tester/testrepo/issues{/number}'),
    ).toEqual({ owner: 'tester', repo: 'testrepo' });
  });
});
