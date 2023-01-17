import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import NoContentsContainer from '.';

import { bookmarkInitialState } from '../../../redux/bookmark';
import { commonInitailState } from '../../../redux/common';
import { repositoryInitialState } from '../../../redux/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

import { bookmarks } from '../../../fixture/bookmark';

jest.mock('../../../redux/store');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('NoContentsContainer는', () => {
  const dispatch = jest.fn();

  context('bookmarks가 비어있지 않다면', () => {
    const renderNoContentsContainer = () => render(
      <MemoryRouter>
        <NoContentsContainer />
      </MemoryRouter>,
    );

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

    it('NoContents가 렌더링됩니다.', () => {
      const { container } = renderNoContentsContainer();

      expect(container).toHaveTextContent('북마크에 저장된게 없어요!');
    });

    it('검색하러 가기를 누르면 navigate가 호출됩니다.', () => {
      const { getByText } = renderNoContentsContainer();

      const button = getByText('검색하러 가기');

      fireEvent.click(button);

      expect(mockedUsedNavigate).toBeCalledWith('/');
    });
  });

  context('bookmarks가 비어있다면', () => {
    const renderNoContentsContainer = () => render(
      <MemoryRouter>
        <NoContentsContainer />
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

    it('NoContents가 렌더링 되지 않습니다.', () => {
      const { container } = renderNoContentsContainer();

      expect(container).not.toHaveTextContent('북마크에 저장된게 없어요!');
    });
  });
});
