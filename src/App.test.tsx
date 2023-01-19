import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

import { bookmarkInitialState } from './redux/bookmark/bookmark';
import { commonInitailState } from './redux/common/common';
import { repositoryInitialState } from './redux/repository/repository';

import { RootState, useAppDispatch, useAppSelector } from './redux/store';

import { bookmarks } from './fixture/bookmark';

jest.mock('./redux/store');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('App', () => {
  const dispatch = jest.fn();

  const renderApp = (path: string) => render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
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

  context('path가 "/" 일 때', () => {
    it('SearchForm이 보여집니다.', () => {
      const { getByPlaceholderText } = renderApp('/');

      expect(getByPlaceholderText('검색하고 싶은 레포지토리를 입력해주세요')).not.toBeNull();
    });

    it('bookmark아이콘을 누르면 navigate가 호출됩니다.', () => {
      const { getByTestId } = renderApp('/');

      const bookmarkButton = getByTestId('bookmarkSvg');

      fireEvent.click(bookmarkButton);

      expect(mockedUsedNavigate).toBeCalled();
    });
  });

  context('path가 "/bookmark"일 때', () => {
    it('북마크 탭이 보여집니다.', () => {
      const { container } = renderApp('/bookmark');

      bookmarks.forEach(({ repository }) => {
        expect(container).toHaveTextContent(repository.fullName);
      });
    });

    it('깃허브 이슈 정리를 누르면 navigate가 호출됩니다.', () => {
      const { getByText } = renderApp('/bookmark');

      const headerButton = getByText('깃허브 이슈 정리');

      fireEvent.click(headerButton);

      expect(mockedUsedNavigate).toBeCalled();
    });
  });
});
