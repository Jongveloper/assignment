import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonDialog from '../../../components/common/Dialog/CommonDialog';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { cleanDialog } from '../../../redux/common/common';

import { setInitialRepositoryId } from '../../../utils/setInitialRepositoryId';

const DialogContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { dialog } = useAppSelector((state) => state.common);

  const handleCloseDialog = useCallback(() => {
    dispatch(cleanDialog());
  }, []);

  const handleNavigateButton = useCallback(() => {
    navigate(`/bookmark/${setInitialRepositoryId()}`);
  }, []);

  useEffect(() => () => {
    dispatch(cleanDialog());
  }, []);

  return (
    <CommonDialog
      dialog={dialog}
      onCloseDialog={handleCloseDialog}
      onClickNavigateButton={handleNavigateButton}
    />
  );
};

export default DialogContainer;
