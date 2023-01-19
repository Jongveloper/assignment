import { fireEvent, render } from '@testing-library/react';

import IssueCard from './IssueCard';

describe('IssueCard', () => {
  const onClick = jest.fn();
  const renderIssueCard = () => render(
    <IssueCard
      user="홍길동"
      title="테스트코드"
      body="동작"
      url="url"
      repositoryName="테스트"
      onClickIssueCard={onClick}
    />,
  );
  it('IssueCard 컨텐츠가 보여집니다.', () => {
    const { container } = renderIssueCard();

    expect(container).toHaveTextContent('홍길동');
    expect(container).toHaveTextContent('테스트코드');
    expect(container).toHaveTextContent('동작');
  });

  it('IssueCard를 클릭하면 onClick이 호출됩니다.', () => {
    const { getByText } = renderIssueCard();

    fireEvent.click(getByText('테스트코드'));

    expect(onClick).toBeCalled();
  });
});
