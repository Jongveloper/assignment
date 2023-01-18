import { Fragment, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import { useNavigate, useParams } from 'react-router-dom';

import Tab from '../../../components/bookmark/Tab';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { selectBookmark, setRemainBookmark } from '../../../redux/bookmark';
import { setInitialRepositoryId } from '../../../utils/setInitialRepositoryId';

const Wrapper = styled.div`
  display: flex;

  position: fixed;
  top: 80px;
  right: 5px;

  width: 100%;
  margin: auto;

  border-top: 4px solid black;
  border-bottom: 4px solid black;

  background-color: white;
`;

const TabsContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bookmarks, selectedBookmark } = useAppSelector((state) => state.bookmark);

  const { repositoryId } = useParams();

  const handleClickTap = useCallback((id: number) => {
    navigate(`/bookmark/${id}`);
  }, []);

  const handleClickDelete = useCallback((id: number) => {
    dispatch(setRemainBookmark(id));
  }, []);

  useEffect(() => {
    if (!bookmarks.length) {
      return;
    }

    if (repositoryId === undefined) {
      dispatch(selectBookmark(setInitialRepositoryId()));

      return;
    }

    dispatch(selectBookmark(Number(repositoryId)));
  }, [repositoryId]);

  return (
    <Wrapper>
      {bookmarks.map(({ repository: { id, fullName } }) => (
        <Fragment key={id}>
          <Tab
            id={id}
            selected={selectedBookmark?.repository.id === id}
            fullName={fullName}
            onClickTap={handleClickTap}
            onClickDelete={handleClickDelete}
          />
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default TabsContainer;
