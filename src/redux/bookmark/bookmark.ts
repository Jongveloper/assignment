import { createSlice } from '@reduxjs/toolkit';

import { getIssue } from '../../service/bookmark/getIssue';

import { alreadyExistsIn } from '../../utils/alreadyExistsIn';
import { localStorageSetBookmark } from '../../utils/localStorageSetBookmark';

import {
  dontShowLoading,
  showAlert,
  showError,
  showLoading,
} from '../common/common';

import { RepositoryInfo } from '../repository/type';

import { AppDispatch, RootState } from '../store';

import { Bookmark } from './type';

const MAX_BOOKMARKS_SIZE = 4;

interface BookmarkState {
  bookmarks: Bookmark[];
  selectedBookmark?: Bookmark;
  page: number;
}

export const bookmarkInitialState: BookmarkState = {
  bookmarks: JSON.parse(localStorage.getItem('bookmark') as string) ?? [],
  selectedBookmark: undefined,
  page: 2,
};

const { actions, reducer } = createSlice({
  name: 'bookmark',
  initialState: bookmarkInitialState,
  reducers: {
    saveBookmarks: (state, { payload: bookmark }) => ({
      ...state,
      bookmarks: [...state.bookmarks, bookmark],
    }),
    saveMoreBookmarks: (state, { payload: { bookmarks, selectedBookmark } }) => ({
      ...state,
      bookmarks,
      selectedBookmark,
      page: state.page + 1,
    }),
    selectBookmark: (state, { payload: id }) => {
      if (state.selectedBookmark?.repository.id === id) {
        return state;
      }

      const bookmark = state.bookmarks.find(({ repository }) => repository.id === id);

      return {
        ...state,
        selectedBookmark: bookmark,
      };
    },
    remainBookmark: (state, { payload: bookmarks }) => ({
      ...state,
      bookmarks,
    }),
    deleteSelectedBookmark: (state) => ({
      ...state,
      selectedBookmark: undefined,
    }),
  },
});

export const {
  saveBookmarks,
  saveMoreBookmarks,
  selectBookmark,
  remainBookmark,
  deleteSelectedBookmark,
} = actions;

export const setRemainBookmark = (id : number) => (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const { bookmark: { bookmarks, selectedBookmark } } = getState();

  if (selectedBookmark?.repository.id === id) {
    dispatch(deleteSelectedBookmark());
  }

  const remainBookmarks = bookmarks.filter(({ repository }) => repository.id !== id);

  localStorage.removeItem('bookmark');

  dispatch(remainBookmark(remainBookmarks));

  localStorage.setItem('bookmark', JSON.stringify(remainBookmarks));
};

export const setBookmark = (
  repository: RepositoryInfo,
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { bookmark: { bookmarks } } = getState();

  if (alreadyExistsIn(bookmarks, repository)) {
    dispatch(showAlert({
      message: '?????? ???????????? ?????????????????????.',
      title: '????????? ????????? ??????????????????.',
    }));

    return;
  }

  if (bookmarks.length >= MAX_BOOKMARKS_SIZE) {
    dispatch(showAlert({
      message: `???????????? ?????? ${MAX_BOOKMARKS_SIZE}????????? ????????? ??? ????????????.`,
      title: '????????? ????????? ??????????????????.',
    }));

    return;
  }

  try {
    const responseIssues = await getIssue({
      owner: repository.owner,
      repo: repository.repo,
      page: 1,
    });

    if (!responseIssues.length) {
      dispatch(showError({
        message: '?????????????????? ????????? ????????????.',
        title: '????????? ????????? ??????????????????.',
      }));

      return;
    }

    dispatch(saveBookmarks({ issues: responseIssues, repository }));

    localStorageSetBookmark(responseIssues, repository);

    dispatch(showAlert({
      message: '???????????? ?????????????????????.',
      title: '?????????',
    }));
  } catch (error) {
    const { message } = error as Error;

    dispatch(showError({
      message,
      title: '????????? ????????? ??????????????????.',
    }));
  }
};

export const setMoreBookmarkIssues = (
  repository: RepositoryInfo,
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { bookmark: { bookmarks, selectedBookmark, page } } = getState();
  dispatch(showLoading());
  try {
    const responseIssues = await getIssue({
      owner: repository.owner,
      repo: repository.repo,
      page: page + 1,
    });

    const transitionBookmarks = bookmarks.map((bookmark) => {
      if (bookmark.repository.id === repository.id) {
        return { repository, issues: [...bookmark.issues, ...responseIssues] };
      }

      return bookmark;
    });

    const transitionSelectedBookmark = {
      repository,
      issues: [...selectedBookmark!.issues, ...responseIssues],
    };

    localStorage.removeItem('bookmark');

    dispatch(saveMoreBookmarks({
      bookmarks: transitionBookmarks,
      selectedBookmark: transitionSelectedBookmark,
    }));

    localStorage.setItem('bookmark', JSON.stringify(transitionBookmarks));
  } catch (error) {
    const { message } = error as Error;

    dispatch(showError({
      showDialog: true,
      status: 'ERROR',
      message,
      title: '????????? ??????????????? ??????????????????.',
    }));
  }
  dispatch(dontShowLoading());
};

export default reducer;
