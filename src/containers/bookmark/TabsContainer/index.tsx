import { Fragment, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import { useNavigate, useParams } from 'react-router-dom';

import Tab from '../../../components/bookmark/Tab';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { selectBookmark } from '../../../redux/bookmark';

const Wrapper = styled.div`
  display: flex;

  width: 80%;
  margin: auto;
`;

function TabsContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bookmarks, selectedBookmark } = useAppSelector((state) => state.bookmark);

  const { repositoryId } = useParams();

  const TabHandler = useCallback((id: number) => {
    navigate(`/bookmark/${id}`);
  }, []);

  if (!bookmarks.length) {
    return (
      <p>북마크에 저장된게 없어요!</p>
    );
  }

  useEffect(() => {
    dispatch(selectBookmark(Number(repositoryId)));
  }, [repositoryId]);

  return (
    <Wrapper>
      {bookmarks.map(({ repository: { id, full_name } }) => (
        <Fragment key={id}>
          <Tab
            id={id}
            selected={selectedBookmark?.repository.id === id}
            fullName={full_name}
            handleNavigate={TabHandler}
          />
        </Fragment>
      ))}
    </Wrapper>
  );
}

export default TabsContainer;
