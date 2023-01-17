import { Fragment, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import InfinityScroll from '../InfinityScrollContainer';

import Repository from '../../../components/main/Repository';

import { loadIssueProps } from '../../../redux/bookmark/type';

import { cleanRepositories, loadMoreRepositories } from '../../../redux/repository';

import { setBookmark } from '../../../redux/bookmark';

import { useAppDispatch, useAppSelector } from '../../../redux/store';

const Wrap = styled.div`
  margin-top: 12rem;
`;

const RepositoriesContainer = () => {
  const dispatch = useAppDispatch();
  const { repositories, page, searchWord } = useAppSelector((state) => state.repository);

  const getMoreRepositories = useCallback(() => {
    dispatch(loadMoreRepositories({ repository: searchWord, page }));
  }, [searchWord, page]);

  const addBookMark = useCallback(({ repo, owner, repository }: loadIssueProps) => {
    dispatch(setBookmark({ repo, owner, repository }));
  }, []);

  useEffect(() => () => {
    dispatch(cleanRepositories());
  }, []);

  return (
    <Wrap>
      {repositories.map(({
        id,
        fullName,
        updatedAt,
        description,
        language,
        stargazersCount,
        circleColor,
        owner,
        repo,
      }, idx) => (
        <Fragment key={id}>
          <Repository
            id={id}
            fullName={fullName}
            updatedAt={updatedAt}
            description={description}
            language={language}
            stargazersCount={stargazersCount}
            circleColor={circleColor}
            owner={owner}
            repo={repo}
            handleClick={addBookMark}
          />
          <InfinityScroll
            index={idx}
            length={repositories.length}
            next={getMoreRepositories}
          />
        </Fragment>
      ))}

    </Wrap>
  );
};

export default RepositoriesContainer;
