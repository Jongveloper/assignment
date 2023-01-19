import { fireEvent, render } from '@testing-library/react';
import BookmarkButton from '.';

describe('BookmarkButton 렌더링 되면', () => {
  const onClick = jest.fn();
  const renderBookmarkButton = () => render(
    <BookmarkButton onClick={onClick} />,
  );

  it('북마크 버튼이 보여집니다.', () => {
    const { getByTestId } = renderBookmarkButton();

    expect(getByTestId('bookmark')).not.toBeNull();
  });

  it('버튼을 클릭하면 onClick이 호출됩니다.', () => {
    const { getByTestId } = renderBookmarkButton();

    const bookmarkButton = getByTestId('bookmark');

    fireEvent.click(bookmarkButton);

    expect(onClick).toBeCalled();
  });
});
