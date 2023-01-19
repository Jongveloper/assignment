import { createSlice } from '@reduxjs/toolkit';

import { DialogState } from './type';

interface CommonState {
  showLoading: boolean;
  dialog: DialogState;
}

export const commonInitailState: CommonState = {
  showLoading: false,
  dialog: {
    showDialog: false,
    message: '',
    title: '',
  },
};

const { actions, reducer } = createSlice({
  name: 'common',
  initialState: commonInitailState,
  reducers: {
    setLoading: (state, { payload }) => ({
      ...state,
      showLoading: payload,
    }),
    cleanDialog: (state) => ({
      ...state,
      dialog: {
        ...commonInitailState.dialog,
      },
    }),
    showAlert: (state, { payload }) => ({
      ...state,
      dialog: {
        showDialog: true,
        status: 'ALERT',
        ...payload,
      },
    }),
    showError: (state, { payload }) => ({
      ...state,
      dialog: {
        showDialog: true,
        status: 'ERROR',
        ...payload,
      },
    }),
  },
});

export const {
  setLoading,
  cleanDialog,
  showAlert,
  showError,
} = actions;

export default reducer;
