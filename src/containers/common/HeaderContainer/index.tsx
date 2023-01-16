import { useNavigate } from 'react-router-dom';

import Header from '../../../components/common/Header';
import { useAppSelector } from '../../../redux/store';

export default function HeaderContainer() {
  const navigate = useNavigate();

  const { bookmarks } = useAppSelector((state) => state.bookmark);

  const handleNavigate = ({ path }: {path: string}) => {
    navigate(path);
  };

  return (
    <Header
      handleNavigate={handleNavigate}
      bookmarkAmount={bookmarks.length}
    />
  );
}
