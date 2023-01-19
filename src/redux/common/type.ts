export interface DialogState {
  showDialog: boolean;
  status?: 'ERROR' | 'ALERT';
  message: string;
  title: string;
}
