import { useCallback } from 'react';

import CommonDialog from '../../../components/common/Dialog';

import { closeDialog } from '../../../redux/common';

import { useAppDispatch, useAppSelector } from '../../../redux/store';

function DialogContainer() {
  const dispatch = useAppDispatch();

  const {
    dialog: {
      isOpen, message, title, status,
    },
  } = useAppSelector((state) => state.common);

  const handleCloseDialog = useCallback(() => {
    dispatch(closeDialog());
  }, []);

  return (
    <CommonDialog
      isOpen={isOpen}
      message={message}
      title={title}
      status={status}
      handleClose={handleCloseDialog}
      handleNavigate={() => {}}
    />
  );
}

export default DialogContainer;
