import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import NoContents from '../../../components/bookmark/NoContents';

export default function NoContentsContainer() {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, []);
  return (
    <NoContents
      handleNavigate={goHome}
    />
  );
}
