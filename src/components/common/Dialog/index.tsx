import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DialogState } from '../../../redux/common/type';

interface DialogProps extends DialogState {
  handleClose: () => void;
  handleNavigate: () => void;
}

const CommonDialog = ({
  isOpen,
  message,
  title,
  status,
  handleClose,
  handleNavigate,
}: DialogProps) => (
  <div>
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {status === 'ALERT' && <Button onClick={handleNavigate}>북마크 보러가기</Button>}
        <Button onClick={handleClose} autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default CommonDialog;
