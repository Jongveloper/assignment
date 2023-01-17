import { render } from '@testing-library/react';

import Loading from '.';

describe('Loading', () => {
  it('CircularProgress가 렌더링됩니다.', () => {
    const { getByTestId } = render((
      <Loading />
    ));

    expect(getByTestId('CircularProgress')).not.toBeNull();
  });
});
