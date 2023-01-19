import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonDialog from '../../../components/common/Dialog/CommonDialog';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { closeDialog } from '../../../redux/common/common';

import { setInitialRepositoryId } from '../../../utils/setInitialRepositoryId';

const DialogContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    dialog: {
      isOpen,
      message,
      title,
      status,
    },
  } = useAppSelector((state) => state.common);

  const handleCloseDialog = useCallback(() => {
    dispatch(closeDialog());
  }, []);

  const handleNavigateButton = useCallback(() => {
    navigate(`/bookmark/${setInitialRepositoryId()}`);
  }, []);

  useEffect(() => () => {
    dispatch(closeDialog());
  }, []);

  return (
    <CommonDialog
      isOpen={isOpen}
      message={message}
      title={title}
      status={status}
      onCloseDialog={handleCloseDialog}
      onClickNavigateButton={handleNavigateButton}
    />
  );
};

export default DialogContainer;
