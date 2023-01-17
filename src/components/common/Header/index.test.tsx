import { fireEvent, render } from '@testing-library/react';
import Header from '.';

describe('Header', () => {
  const handleNavigate = jest.fn();
  const renderHeader = () => render(
    <Header
      bookmarkAmount={4}
      handleNavigate={handleNavigate}
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

    expect(handleNavigate).toBeCalled();
  });

  it('bookmark를 누르면 handleNavigate가 호출됩니다.', () => {
    const { getByTestId } = renderHeader();

    const button = getByTestId('bookmarkSvg');

    fireEvent.click(button);

    expect(handleNavigate).toBeCalled();
  });
});
