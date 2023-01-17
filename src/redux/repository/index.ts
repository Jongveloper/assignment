import { createSlice } from '@reduxjs/toolkit';

import { AppDispatch } from '../store';

import { getRepository } from '../../service/getRepository';

import { RequestRepositoriesProps } from '../../types/Repository';
import { RepositoryInfo } from './type';

import { setDialog, setLoading } from '../common';

export interface RepositoryState {
  repositories: RepositoryInfo[];
  searchWord: string;
  page: number;
}

export const initialState:RepositoryState = {
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
    saveRepositories: (state, { payload }) => ({
      ...state,
      repositories: payload,
      page: 2,
    }),
    saveMoreRepositories: (state, { payload }) => ({
      ...state,
      repositories: [...state.repositories, ...payload],
      page: state.page + 1,
    }),
    cleanRepositories: (state) => ({
      ...state,
      repositories: [],
      searchWord: '',
    }),
  },
});

export const {
  cleanRepositories,
  setSearchWord,
  saveRepositories,
  saveMoreRepositories,
} = actions;

export default reducer;

export const loadRepositories = ({ repository, page } :
  RequestRepositoriesProps) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const repositories = await getRepository({ repository, page });

    dispatch(saveRepositories(repositories));

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
    const repositories = await getRepository({ repository, page });

    dispatch(saveMoreRepositories(repositories));

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
