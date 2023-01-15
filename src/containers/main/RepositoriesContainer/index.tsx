import { Fragment, useCallback } from 'react';

import InfinityScroll from '../InfinityScrollContainer';

import Repository from '../../../components/main/Repository';

import { loadIssueProps} from '../../../redux/bookmark/type';

import { loadMoreRepositories } from '../../../redux/repository';

import { setBookmark } from "../../../redux/bookmark";

import { useAppDispatch, useAppSelector } from '../../../redux/store';

function RepositoriesContainer() {
  const dispatch = useAppDispatch();
  const { repositories, page, searchWord } = useAppSelector((state) => state.repository);

  const getMoreRepositories = useCallback(() => {
    dispatch(loadMoreRepositories({ repository: searchWord, page }));
  }, [searchWord, page]);

  const addBookMark = useCallback(({ repo, owner, repository }: loadIssueProps) => {
    dispatch(setBookmark({ repo, owner, repository }));
  }, []);

  return (
    <>
      {repositories.map(({
        id,
        full_name,
        updated_at,
        description,
        language,
        stargazers_count,
        circleColor,
        owner,
        repo
      }, idx) => (
        <Fragment key={id}>
          <Repository
            id={id}
            full_name={full_name}
            updated_at={updated_at}
            description={description}
            language={language}
            stargazers_count={stargazers_count}
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

    </>
  );
}

export default RepositoriesContainer;
