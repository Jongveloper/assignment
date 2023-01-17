import { render, fireEvent } from '@testing-library/react';

import SearchForm from '.';

describe('SearchForm', () => {
  const handleChange = jest.fn();
  const onSubmit = jest.fn();
  const renderSearchForm = () => render(
    <SearchForm
      searchWord=""
      handleChange={handleChange}
      onSubmit={onSubmit}
    />,
  );
  it('SearchForm이 렌더링됩니다.', () => {
    const { getByPlaceholderText } = renderSearchForm();

    expect(getByPlaceholderText('검색하고 싶은 레포지토리를 입력해주세요')).not.toBeNull();
  });

  it('검색 버튼을 누르면 onSubmit이 호출됩니다.', () => {
    const { getByText } = renderSearchForm();

    const button = getByText('검색');

    fireEvent.submit(button);

    expect(onSubmit).toBeCalled();
  });

  it('Input에 입력을 하면 handleChange가 호출됩니다.', () => {
    const { getByPlaceholderText } = renderSearchForm();

    const input = getByPlaceholderText('검색하고 싶은 레포지토리를 입력해주세요');

    fireEvent.change(input, { target: { value: 'InputTest' } });

    expect(handleChange).toBeCalled();
  });
});
