import { convertDateFormat } from './convertDateFormat';

describe('convertDateFormat', () => {
  it('연도-월-일이 리턴됩니다.', () => {
    expect(convertDateFormat('2021-09-08T16:00:16Z')).toBe('2021-09-08');
  });
});
