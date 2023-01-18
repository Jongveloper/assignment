import { render } from '@testing-library/react';
import Language from '.';

describe('Language', () => {
  it('language가 없으면 null이 반환됩니다.', () => {
    const { container } = render(
      <Language
        color="red"
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('language가 보여집니다.', () => {
    const { container } = render(
      <Language
        color="yellow"
        language="JavaScript"
      />,
    );

    expect(container).toHaveTextContent('JavaScript');
  });
});
