import { fireEvent, render } from '@testing-library/react';
import { bookmarkInitialState } from '../../../redux/bookmark/bookmark';
import { commonInitailState } from '../../../redux/common/common';
import { repositoryInitialState } from '../../../redux/repository/repository';

import IssueContainer from './IssueContainer';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

import { bookmark } from '../../../fixture/bookmark';
import MockIntersectionObserver from '../../../__mocks__/MockIntersectionObserver';

jest.mock('../../../redux/store');

window.IntersectionObserver = MockIntersectionObserver;

describe('IssueContainer', () => {
  const dispatch = jest.fn();

  window.open = jest.fn();

  const renderIssueContainer = () => render(
    <IssueContainer />,
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as jest.Mock).mockImplementation(() => dispatch);

    (useAppSelector as jest.Mock).mockImplementation((state:
      (arg: RootState) => void) => state({
      bookmark: {
        ...bookmarkInitialState,
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

  it('issue들이 보여집니다.', () => {
    const { container } = renderIssueContainer();

    bookmark.issues.forEach(({ title }) => {
      expect(container).toHaveTextContent(title);
    });
  });

  it('issue를 클릭하면 해당 이슈 Url로 이동합니다.', () => {
    const { getByText } = renderIssueContainer();

    const Issue = getByText('Issue');

    fireEvent.click(Issue);

    expect(window.open).toBeCalledWith('testUrl');
  });
});
