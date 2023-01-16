import { createSlice } from '@reduxjs/toolkit';

import { DialogState } from './type';

interface CommonState {
  isLoading: boolean;
  dialog: DialogState;
}

const initialState: CommonState = {
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
