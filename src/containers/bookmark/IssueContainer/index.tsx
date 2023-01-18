import { Fragment, useCallback } from 'react';

import styled from '@emotion/styled';

import IssueCard from '../../../components/bookmark/IssueCard';

import { setMoreBookmarkIssues } from '../../../redux/bookmark';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

import InfinityScroll from '../../main/InfinityScrollContainer';

const Wrap = styled.div`
  margin-top: 15rem;
`;

const IssueContainer = () => {
  const dispatch = useAppDispatch();
  const { selectedBookmark } = useAppSelector((state) => state.bookmark);

  const getMoreIssues = useCallback(() => {
    dispatch(setMoreBookmarkIssues(selectedBookmark?.repository!));
  }, [selectedBookmark]);

  const handleClickIssueCard = useCallback((url: string) => {
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
            onClickIssueCard={handleClickIssueCard}
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
