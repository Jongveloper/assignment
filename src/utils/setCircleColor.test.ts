import { setCircleColor } from './setCircleColor';

describe('setCircleColor', () => {
  context('전달한 인자가 colors객체에 존재할 때', () => {
    it('언어에 맞는 컬러가 리턴됩니다.', () => {
      expect(setCircleColor('JavaScript')).toBe('#FFF200');
    });
  });

  context('전달한 인자가 colors객체에 존재하지 않을 때', () => {
    it('white가 리턴됩니다.', () => {
      expect(setCircleColor('someLanguage')).toBe('white');
    });
  });
});
