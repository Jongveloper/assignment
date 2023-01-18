import { render } from '@testing-library/react';

import LoadingContainer from '.';

import { bookmarkInitialState } from '../../../redux/bookmark';
import { commonInitailState } from '../../../redux/common';
import { repositoryInitialState } from '../../../redux/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

jest.mock('../../../redux/store.ts');

describe('LoadingContainer는', () => {
  const dispatch = jest.fn();

  const renderLoadingContainer = () => render(
    <LoadingContainer />,
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
        isLoading: true,
      },
      repository: {
        ...repositoryInitialState,
      },
    }));
  });

  it('CircularProgress가 보여집니다.', () => {
    const { getByTestId } = renderLoadingContainer();

    expect(getByTestId('CircularProgress')).not.toBeNull();
  });
});
