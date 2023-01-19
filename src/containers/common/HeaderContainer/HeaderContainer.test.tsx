import { fireEvent, render } from '@testing-library/react';

import HeaderContainer from './HeaderContainer';
import { bookmarks } from '../../../fixture/bookmark';

import { bookmarkInitialState } from '../../../redux/bookmark/bookmark';
import { commonInitailState } from '../../../redux/common/common';
import { repositoryInitialState } from '../../../redux/repository/repository';

import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

jest.mock('../../../redux/store');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  const renderHeaderContainer = () => render(
    <HeaderContainer />,
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as jest.Mock).mockImplementation(() => dispatch);

    (useAppSelector as jest.Mock).mockImplementation((state:
      (arg: RootState) => void) => state({
      bookmark: {
        ...bookmarkInitialState,
        bookmarks,
      },
      common: {
        ...commonInitailState,
      },
      repository: {
        ...repositoryInitialState,
      },
    }));
  });

  it('bookmarks의 길이가 보여집니다.', () => {
    const { container } = renderHeaderContainer();

    expect(container).toHaveTextContent('2');
  });

  it('깃허브 이슈 정리를 누르면 naivgate "/" 와 함께 호출됩니다.', () => {
    const { getByText } = renderHeaderContainer();

    const navigateButton = getByText('깃허브 이슈 정리');

    fireEvent.click(navigateButton);

    expect(mockedUsedNavigate).toBeCalledWith('/');
  });

  it('북마크 아이콘을 누르면 navigate가 "/bookmark"와 함께 호출됩니다.', () => {
    const { getByTestId } = renderHeaderContainer();

    const navigateButton = getByTestId('bookmarkSvg');

    fireEvent.click(navigateButton);

    expect(mockedUsedNavigate).toBeCalledWith('/bookmark');
  });
});
