import { render } from '@testing-library/react';
import CenterLayout from './index';

describe('CenterLayout', () => {
  it('CenterLayout이 렌더링됩니다.', () => {
    const { container } = render((
      <CenterLayout>
        <p>테스트</p>
      </CenterLayout>
    ));

    expect(container).toHaveTextContent('테스트');
  });
});
