import { fireEvent, render } from '@testing-library/react';
import Repository from '.';

describe('Repository', () => {
  const handleClick = jest.fn();
  const renderRepository = () => render(
    <Repository
      id={1}
      fullName="레포지토리"
      updatedAt="2023-01-01"
      description="내용"
      language="JavaScript"
      stargazersCount={20}
      circleColor="yellow"
      repo="repo"
      owner="owner"
      handleClick={handleClick}
    />,
  );
  it('Repository가 렌더링됩니다.', () => {
    const { container } = renderRepository();

    expect(container).toHaveTextContent('레포지토리');
    expect(container).toHaveTextContent('2023-01-01');
    expect(container).toHaveTextContent('JavaScript');
  });

  it('bookmark 아이콘을 누르면 handleClick이 호출됩니다.', () => {
    const { getByTestId } = renderRepository();

    const button = getByTestId('bookmark');

    fireEvent.click(button);

    expect(handleClick).toBeCalled();
  });
});
