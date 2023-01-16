export interface DialogState {
  isOpen: boolean;
  status?: 'ERROR' | 'ALERT' | '';
  message: string;
  title: string;
}
