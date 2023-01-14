import Loading from '../../../components/common/Loading';

import { useAppSelector } from '../../../redux/store';

function LoadingContainer() {
  const { isLoading } = useAppSelector((state) => state.common);

  return (
    <>
      {isLoading && <Loading />}
    </>
  );
}

export default LoadingContainer;
