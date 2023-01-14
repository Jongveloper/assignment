import { createSlice } from '@reduxjs/toolkit';

import { AppDispatch } from '../store';

import { getRepository } from '../../service/getRepository';

import { convertRepositories } from '../../utils/convertRepositories';

import { Repository } from "./type";
import { RequestRepositoriesProps } from '../../types/Repository';

import { setDialog, setLoading } from '../common';

export const initialState:Repository = {
  repositories: [],
  searchWord: '',
  page: 0,
};

const { actions, reducer } = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setSearchWord: (state, { payload }) => ({
      ...state,
      searchWord: payload,
    }),
    saveRepositories: (state, { payload }) => {
      const filteredRepositories = convertRepositories(payload);
      return {
        ...state,
        repositories: filteredRepositories,
        page: 2,
      };
    },
    saveMoreRepositories: (state, { payload }) => {
      const filteredRepositories = convertRepositories(payload);
      return {
        ...state,
        repositories: [...state.repositories, ...filteredRepositories],
        page: state.page + 1,
      };
    },
  },
});

export const {
  setSearchWord,
  saveRepositories,
  saveMoreRepositories,
} = actions;

export default reducer;

export const loadRepositories = ({ repository, page } :
  RequestRepositoriesProps) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const { data: { items } } = await getRepository({ repository, page });

    dispatch(saveRepositories(items));

    dispatch(setLoading(false));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setLoading(false));

    dispatch(setDialog({
      isOpen: true,
      status: 'ERROR',
      message,
      title: '레포지토리를 불러오는데 실패했습니다.',
    }));
  }
};

export const loadMoreRepositories = ({ repository, page } :
  RequestRepositoriesProps) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const { data: { items } } = await getRepository({ repository, page });

    dispatch(saveMoreRepositories(items));

    dispatch(setLoading(false));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setLoading(false));

    dispatch(setDialog({
      isOpen: true,
      status: 'ERROR',
      message,
      title: '레포지토리를 불러오는데 실패했습니다.',
    }));
  }
};
