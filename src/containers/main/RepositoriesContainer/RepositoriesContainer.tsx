import { Fragment, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import InfinityScroll from '../InfinityScrollContainer/InfinityScrollContainer';

import Repository from '../../../components/main/Repository/Repository';

import { cleanRepositories, loadMoreRepositories } from '../../../redux/repository/repository';

import { setBookmark } from '../../../redux/bookmark/bookmark';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { RepositoryInfo } from '../../../redux/repository/type';

const Wrap = styled.div`
  margin-top: 12rem;
`;

const RepositoriesContainer = () => {
  const dispatch = useAppDispatch();
  const { repositories, page, searchWord } = useAppSelector((state) => state.repository);

  const getMoreRepositories = useCallback(() => {
    dispatch(loadMoreRepositories());
  }, [searchWord, page]);

  const handleClickBook = useCallback((repository: RepositoryInfo) => {
    dispatch(setBookmark(repository));
  }, []);

  useEffect(() => () => {
    dispatch(cleanRepositories());
  }, []);

  return (
    <Wrap>
      {repositories.map((repository, index) => (
        <Fragment key={repository.id}>
          <Repository
            repository={repository}
            onClickBookMark={handleClickBook}
          />
          <InfinityScroll
            index={index}
            length={repositories.length}
            next={getMoreRepositories}
          />
        </Fragment>
      ))}
    </Wrap>
  );
};

export default RepositoriesContainer;
