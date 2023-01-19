import { fireEvent, render } from '@testing-library/react';

import Repository from './Repository';

import { repository } from '../../../fixture/repositories';

describe('Repository', () => {
  const onClickBookMark = jest.fn();
  const renderRepository = () => render(
    <Repository
      repository={repository}
      onClickBookMark={onClickBookMark}
    />,
  );
  it('Repository가 렌더링됩니다.', () => {
    const { container } = renderRepository();

    expect(container).toHaveTextContent(repository.fullName);
  });

  it('bookmark 아이콘을 누르면 handleClick이 호출됩니다.', () => {
    const { getByTestId } = renderRepository();

    const button = getByTestId('bookmark');

    fireEvent.click(button);

    expect(onClickBookMark).toBeCalled();
  });
});
