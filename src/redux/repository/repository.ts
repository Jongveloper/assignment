import { createSlice } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';

import { getRepository } from '../../service/repository/getRepository';

import { RepositoryInfo } from './type';

import { setLoading, showError } from '../common/common';

export interface RepositoryState {
  repositories: RepositoryInfo[];
  searchWord: string;
  page: number;
}

export const repositoryInitialState:RepositoryState = {
  repositories: [],
  searchWord: '',
  page: 0,
};

const { actions, reducer } = createSlice({
  name: 'repository',
  initialState: repositoryInitialState,
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

export const loadRepositories = () => async (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  dispatch(setLoading(true));

  const { repository: { searchWord } } = getState();

  try {
    const repositories = await getRepository({
      repository: searchWord,
      page: 1,
    });

    if (!repositories.length) {
      dispatch(showError({
        message: '다른 레포지토리를 검색해주시길 바랍니다.',
        title: '해당하는 레포지토리가 없습니다.',
      }));

      return;
    }

    dispatch(saveRepositories(repositories));
  } catch (error) {
    const { message } = error as Error;

    dispatch(showError({
      showDialog: true,
      status: 'ERROR',
      message,
      title: '레포지토리를 불러오는데 실패했습니다.',
    }));
  }

  dispatch(setLoading(false));
};

export const loadMoreRepositories = () => async (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  dispatch(setLoading(true));

  const { repository: { searchWord, page } } = getState();
  try {
    const repositories = await getRepository({ repository: searchWord, page: page + 1 });

    dispatch(saveMoreRepositories(repositories));
  } catch (error) {
    const { message } = error as Error;

    dispatch(showError({
      showDialog: true,
      status: 'ERROR',
      message,
      title: '레포지토리를 불러오는데 실패했습니다.',
    }));
  }

  dispatch(setLoading(false));
};

export default reducer;
