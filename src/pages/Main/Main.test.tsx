import { render } from '@testing-library/react';

import Main from './Main';

import { bookmarks } from '../../fixture/bookmark';
import MockIntersectionObserver from '../../__mocks__/MockIntersectionObserver';

import { bookmarkInitialState } from '../../redux/bookmark/bookmark';
import { commonInitailState } from '../../redux/common/common';
import { repositoryInitialState } from '../../redux/repository/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';

const mockedUsedNavigate = jest.fn();

jest.mock('../../redux/store.ts');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

window.IntersectionObserver = MockIntersectionObserver;

describe('MainPage', () => {
  const dispatch = jest.fn();
  const renderMain = () => render(
    <Main />,
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

  it('Form이 보여집니다.', () => {
    const { getByPlaceholderText } = renderMain();

    expect(getByPlaceholderText('검색하고 싶은 레포지토리를 입력해주세요')).not.toBeNull();
  });
});
