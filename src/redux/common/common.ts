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
    setDialog: (state, { payload }) => ({
      ...state,
      dialog: payload,
    }),
    cleanDialog: (state) => ({
      ...state,
      dialog: {
        ...commonInitailState.dialog,
      },
    }),
  },
});

export const {
  setLoading,
  setDialog,
  cleanDialog,
} = actions;

export default reducer;
