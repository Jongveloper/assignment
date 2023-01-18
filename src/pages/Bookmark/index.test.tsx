import { render } from '@testing-library/react';

import Bookmark from '.';

import { bookmarks } from '../../fixture/bookmark';
import MockIntersectionObserver from '../../__mocks__/MockIntersectionObserver';

import { bookmarkInitialState } from '../../redux/bookmark';
import { commonInitailState } from '../../redux/common';
import { repositoryInitialState } from '../../redux/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';

const mockedUsedNavigate = jest.fn();

jest.mock('../../redux/store.ts');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

window.IntersectionObserver = MockIntersectionObserver;

describe('Bookmark 페이지는', () => {
  const dispatch = jest.fn();
  const renderBookmark = () => render(
    <Bookmark />,
  );
  context('Bookmarks가 없으면', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      (useAppDispatch as jest.Mock).mockImplementation(() => dispatch);

      (useAppSelector as jest.Mock).mockImplementation((state:
        (arg: RootState) => void) => state({
        bookmark: {
          ...bookmarkInitialState,
        },
        common: {
          ...commonInitailState,
        },
        repository: {
          ...repositoryInitialState,
        },
      }));
    });

    it('북마크에 저장된게 없어요! 가 보여집니다.', () => {
      const { container } = renderBookmark();

      expect(container).toHaveTextContent('북마크에 저장된게 없어요!');
    });
  });

  context('Bookmarks가 있으면', () => {
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

    it('bookmarks가 렌더링됩니다.', () => {
      const { container } = renderBookmark();

      bookmarks.forEach(({ repository: { fullName } }) => {
        expect(container).toHaveTextContent(fullName);
      });
    });
  });
});
