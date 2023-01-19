import { useNavigate } from 'react-router-dom';

import Header from '../../../components/common/Header/Header';
import { useAppSelector } from '../../../redux/store';

const HeaderContainer = () => {
  const navigate = useNavigate();

  const { bookmarks } = useAppSelector((state) => state.bookmark);

  const handleClickLink = (path: string) => {
    navigate(path);
  };

  return (
    <Header
      onClickLink={handleClickLink}
      bookmarkCount={bookmarks.length}
    />
  );
};

export default HeaderContainer;
