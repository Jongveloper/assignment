import Loading from '../../../components/common/Loading/Loading';

import { useAppSelector } from '../../../redux/store';

const LoadingContainer = () => {
  const { isLoading } = useAppSelector((state) => state.common);

  return (
    <>
      {isLoading && <Loading />}
    </>
  );
};

export default LoadingContainer;
