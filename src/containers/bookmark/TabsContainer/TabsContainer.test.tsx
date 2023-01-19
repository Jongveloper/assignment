import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import TabsContainer from './TabsContainer';

import { bookmarkInitialState } from '../../../redux/bookmark/bookmark';
import { commonInitailState } from '../../../redux/common/common';
import { repositoryInitialState } from '../../../redux/repository/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

import { bookmark, bookmarks } from '../../../fixture/bookmark';

jest.mock('../../../redux/store');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    repositoryId: '2',
  }),
  useNavigate: () => mockedUsedNavigate,
}));

describe('TabsContainer는', () => {
  const dispatch = jest.fn();

  context('repositoryId가 undefined고', () => {
    context('bookmarks가 비어있다면', () => {
      const renderTabsContainer = () => render(
        <MemoryRouter>
          <TabsContainer />
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
        const { container } = renderTabsContainer();

        bookmarks.forEach(({ repository: { fullName } }) => {
          expect(container).not.toHaveTextContent(fullName);
        });
      });
    });

    context('bookmarks가 비어있지 않다면', () => {
      const renderTabsContainer = () => render(
        <MemoryRouter>
          <TabsContainer />
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
            selectedBookmark: bookmark,
          },
          common: {
            ...commonInitailState,
          },
          repository: {
            ...repositoryInitialState,
          },
        }));
      });

      it('Tabs가 렌더링됩니다.', () => {
        const { container } = renderTabsContainer();

        bookmarks.forEach(({ repository: { fullName } }) => {
          expect(container).toHaveTextContent(fullName);
        });
      });
    });
  });

  context('repositoryId가 undefined가 아니고', () => {
    const renderTabsContainer = () => render(
      <MemoryRouter>
        <TabsContainer />
      </MemoryRouter>,
    );
    context('bookmarks가 비어있지 않다면', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        (useAppDispatch as jest.Mock).mockImplementation(() => dispatch);

        (useAppSelector as jest.Mock).mockImplementation((state:
        (arg: RootState) => void) => state({
          bookmark: {
            ...bookmarkInitialState,
            bookmarks,
            selectedBookmark: bookmark,
          },
          common: {
            ...commonInitailState,
          },
          repository: {
            ...repositoryInitialState,
          },
        }));
      });

      it('Tabs가 렌더링됩니다.', () => {
        const { container } = renderTabsContainer();

        bookmarks.forEach(({ repository: { fullName } }) => {
          expect(container).toHaveTextContent(fullName);
        });
      });

      it('dispatch가 selectBookmark와 함께 호출됩니다.', () => {
        renderTabsContainer();

        expect(dispatch).toBeCalledWith({
          payload: 2,
          type: 'bookmark/selectBookmark',
        });
      });

      it('repository의 id가 1인 탭의 색이 검은색입니다.', () => {
        const { getByText } = renderTabsContainer();

        const SelectedTabButton = getByText('tester');
        const SelectedTabButtonStyles = getComputedStyle(SelectedTabButton);

        expect(SelectedTabButtonStyles.color).toBe('black');
      });

      it('x버튼을 클릭하면 dispatch가 호출됩니다.', () => {
        const { getAllByText } = renderTabsContainer();

        const button = getAllByText('x')[1];

        fireEvent.click(button);

        expect(dispatch).toBeCalledTimes(2);
      });

      it('선택되지 않은 탭을 눌렀을 때 navigate가 호출됩니다.', () => {
        const { getByText } = renderTabsContainer();

        const TabButton = getByText('tester2');

        fireEvent.click(TabButton);

        expect(mockedUsedNavigate).toBeCalled();
      });
    });
  });
});
