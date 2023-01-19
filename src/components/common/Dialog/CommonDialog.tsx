import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DialogState } from '../../../redux/common/type';

interface Props {
  dialog: DialogState
  onCloseDialog: () => void;
  onClickNavigateButton: () => void;
}

const CommonDialog = ({
  dialog,
  onCloseDialog,
  onClickNavigateButton,
}: Props) => (
  <div>
    <Dialog
      open={dialog.showDialog}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {dialog.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {dialog.status === 'ALERT' && <Button onClick={onClickNavigateButton}>북마크 보러가기</Button>}
        <Button onClick={onCloseDialog} autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default CommonDialog;
