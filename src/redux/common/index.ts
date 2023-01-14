import { createSlice } from '@reduxjs/toolkit';

export interface DialogType {
  isOpen: boolean;
  status?: 'ERROR' | 'ALERT' | '';
  message: string;
  title: string;
}

interface Common {
  isLoading: boolean;
  dialog: DialogType;
}

const initialState: Common = {
  isLoading: false,
  dialog: {
    isOpen: false,
    message: '',
    title: '',
  },
};

const { actions, reducer } = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }),
    setDialog: (state, { payload }) => ({
      ...state,
      dialog: payload,
    }),
    closeDialog: (state) => ({
      ...state,
      dialog: {
        ...state.dialog,
        isOpen: false,
        status: '',
        message: '',
        title: '',
      },
    }),
  },
});

export const {
  setLoading,
  setDialog,
  closeDialog,
} = actions;

export default reducer;
