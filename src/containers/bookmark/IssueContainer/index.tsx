import { Fragment, useCallback } from 'react';

import styled from '@emotion/styled';

import IssueCard from '../../../components/bookmark/IssueCard';

import { setMoreBookmarks } from '../../../redux/bookmark';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import InfinityScroll from '../../main/InfinityScrollContainer';

const Wrap = styled.div`
  margin-top: 12rem;
`;

const IssueContainer = () => {
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
          <IssueCard
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
};

export default IssueContainer;
