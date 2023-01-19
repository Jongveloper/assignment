import { fireEvent, render } from '@testing-library/react';
import RepositoriesContainer from './RepositoriesContainer';
import { repositories } from '../../../fixture/repositories';
import { bookmarkInitialState } from '../../../redux/bookmark/bookmark';
import { commonInitailState } from '../../../redux/common/common';
import { repositoryInitialState } from '../../../redux/repository/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';
import MockIntersectionObserver from '../../../__mocks__/MockIntersectionObserver';

jest.mock('../../../redux/store.ts');

window.IntersectionObserver = MockIntersectionObserver;

describe('RepositoriesContainer', () => {
  const dispatch = jest.fn();
  const renderRepositoriesContainer = () => render(
    <RepositoriesContainer />,
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
        repositories,
      },
    }));
  });

  it('repositories가 보여집니다.', () => {
    const { container } = renderRepositoriesContainer();

    repositories.forEach(({ fullName }) => {
      expect(container).toHaveTextContent(fullName);
    });
  });

  it('bookmark 아이콘을 누르면 dispatch가 호출됩니다.', () => {
    const { getAllByTestId } = renderRepositoriesContainer();

    const firstIcon = getAllByTestId('bookmark')[0];

    fireEvent.click(firstIcon);

    expect(dispatch).toBeCalled();
  });

  it('페이지에서 unmount되면 dispatch가 호출됩니다.', () => {
    const { unmount } = renderRepositoriesContainer();

    unmount();

    expect(dispatch).toBeCalledWith({
      type: 'repository/cleanRepositories',
    });
  });
});
