import { fireEvent, render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  const onClick = jest.fn();
  const renderHeader = () => render(
    <Header
      bookmarkCount={4}
      onClickLink={onClick}
    />,
  );

  it('Header가 렌더링됩니다.', () => {
    const { container } = renderHeader();

    expect(container).toHaveTextContent('깃허브 이슈 정리');
  });

  it('깃허브 이슈 정리를 누르면 handleNavigate가 호출됩니다.', () => {
    const { getByText } = renderHeader();

    const button = getByText('깃허브 이슈 정리');

    fireEvent.click(button);

    expect(onClick).toBeCalled();
  });

  it('bookmark를 누르면 handleNavigate가 호출됩니다.', () => {
    const { getByTestId } = renderHeader();

    const button = getByTestId('bookmarkSvg');

    fireEvent.click(button);

    expect(onClick).toBeCalled();
  });
});
