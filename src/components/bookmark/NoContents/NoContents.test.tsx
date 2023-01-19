import { fireEvent, render } from '@testing-library/react';

import NoContents from './NoContents';

describe('NoContents', () => {
  const onClick = jest.fn();

  const renderNoContents = () => render(
    <NoContents onClick={onClick} />,
  );

  it('북마크에 저장된게 없어요! 가 나타납니다.', () => {
    const { container } = renderNoContents();

    expect(container).toHaveTextContent('북마크에 저장된게 없어요!');
  });

  it('검색하러 가기를 누르면 onClick이 호출됩니다.', () => {
    const { getByText } = renderNoContents();

    const button = getByText('검색하러 가기');

    fireEvent.click(button);

    expect(onClick).toBeCalled();
  });
});
