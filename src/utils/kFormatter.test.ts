import { kFormatter } from './kFormatter';

describe('kFormatter', () => {
  it('숫자가 1,000이 넘으면 1k로 변경합니다.', () => {
    expect(kFormatter(1100)).toBe('1.1k');
  });

  it('숫자가 1,000이 넘지 않으면 변경이 일어나지 않습니다.', () => {
    expect(kFormatter(980)).toBe(980);
  });
});
