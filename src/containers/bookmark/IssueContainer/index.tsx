import { Fragment, useCallback } from 'react';

import styled from '@emotion/styled';

import Issue from '../../../components/bookmark/Issue';
import { setMoreBookmarks } from '../../../redux/bookmark';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import InfinityScroll from '../../main/InfinityScrollContainer';

const Wrap = styled.div`
  margin-top: 12rem;
`;

export default function IssueContainer() {
  const dispatch = useAppDispatch();
  const {
    selectedBookmark,
    page,
  } = useAppSelector((state) => state.bookmark);

  const getMoreIssues = useCallback(() => {
    dispatch(setMoreBookmarks({
      repo: selectedBookmark?.repository.repo!,
      owner: selectedBookmark?.repository.owner!,
      page,
      repository: selectedBookmark?.repository!,
    }));
  }, [selectedBookmark, page]);

  const goToIssue = useCallback((url: string) => {
    window.open(url);
  }, []);

  return (
    <Wrap>
      {selectedBookmark?.issues.map(({
        user,
        title,
        body,
        url,
      }, idx) => (
        <Fragment key={idx}>
          <Issue
            repositoryName={selectedBookmark.repository.repo}
            user={user}
            title={title}
            body={body}
            url={url}
            goToIssue={goToIssue}
          />
          <InfinityScroll
            index={idx}
            length={selectedBookmark.issues.length}
            next={getMoreIssues}
          />
        </Fragment>
      ))}
    </Wrap>
  );
}
