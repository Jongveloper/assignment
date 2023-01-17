import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import NoContents from '../../../components/bookmark/NoContents';

import { useAppSelector } from '../../../redux/store';

const NoContentsContainer = () => {
  const navigate = useNavigate();

  const { bookmarks } = useAppSelector((state) => state.bookmark);

  const goHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <>
      {!bookmarks.length && <NoContents handleNavigate={goHome} />}
    </>
  );
};

export default NoContentsContainer;
