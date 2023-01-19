import { fireEvent, render } from '@testing-library/react';

import FormContainer from './SearchFormContainer';

import { bookmarkInitialState } from '../../../redux/bookmark/bookmark';
import { commonInitailState } from '../../../redux/common/common';
import { repositoryInitialState } from '../../../redux/repository/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

jest.mock('../../../redux/store.ts');

describe('SearchFormContainer', () => {
  const dispatch = jest.fn();

  const renderSearchFormContainer = () => render(
    <FormContainer />,
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

  it('Input에 변화가 일어나면 dispatch가 호출됩니다.', () => {
    const { getByPlaceholderText } = renderSearchFormContainer();

    const input = getByPlaceholderText('검색하고 싶은 레포지토리를 입력해주세요');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(dispatch).toBeCalledWith({
      type: 'repository/setSearchWord',
      payload: 'test',
    });
  });

  it('검색을 누르면 dispatch가 호출됩니다.', () => {
    const { getByText } = renderSearchFormContainer();

    const searchButton = getByText('검색');

    fireEvent.click(searchButton);

    expect(dispatch).toBeCalled();
  });
});
