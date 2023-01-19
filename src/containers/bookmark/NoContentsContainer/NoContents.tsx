import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import NoContents from '../../../components/bookmark/NoContents/NoContents';

import { useAppSelector } from '../../../redux/store';

const NoContentsContainer = () => {
  const navigate = useNavigate();

  const { bookmarks } = useAppSelector((state) => state.bookmark);

  const handleClick = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <>
      {!bookmarks.length && <NoContents onClick={handleClick} />}
    </>
  );
};

export default NoContentsContainer;
