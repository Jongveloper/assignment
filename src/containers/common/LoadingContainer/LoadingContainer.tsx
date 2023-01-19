import Loading from '../../../components/common/Loading/Loading';

import { useAppSelector } from '../../../redux/store';

const LoadingContainer = () => {
  const { showLoading } = useAppSelector((state) => state.common);

  return (
    <>
      {showLoading && <Loading />}
    </>
  );
};

export default LoadingContainer;
