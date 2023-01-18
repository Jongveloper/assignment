import { createSlice } from '@reduxjs/toolkit';

import { getIssue } from '../../service/bookmark/getIssue';

import { alreadyExistsIn } from '../../utils/alreadyExistsIn';
import { localStorageSetBookmark } from '../../utils/localStorageSetBookmark';

import { setDialog, setLoading } from '../common';

import { RepositoryInfo } from '../repository/type';

import { AppDispatch, RootState } from '../store';

import { Bookmark, loadIssueProps } from './type';

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
    deleteBookmark: (state, { payload: bookmarks }) => ({
      ...state,
      bookmarks,
    }),
  },
});

export const {
  saveBookmarks,
  saveMoreBookmarks,
  selectBookmark,
  deleteBookmark,
} = actions;

export const setRemainBookmark = (id : number) => (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const { bookmark: { bookmarks, selectedBookmark } } = getState();

  if (selectedBookmark?.repository.id === id) {
    dispatch(selectBookmark([]));
  }

  const remainBookmarks = bookmarks.filter(({ repository }) => repository.id !== id);

  localStorage.removeItem('bookmark');

  dispatch(deleteBookmark(remainBookmarks));

  localStorage.setItem('bookmark', JSON.stringify(remainBookmarks));
};

export const setBookmark = (
  repository: RepositoryInfo,
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { bookmark: { bookmarks } } = getState();

  if (alreadyExistsIn(bookmarks, repository)) {
    dispatch(setDialog({
      isOpen: true,
      status: 'ALERT',
      message: '이미 북마크에 저장되었습니다.',
      title: '북마크 저장에 실패했습니다.',
    }));

    return;
  }

  if (bookmarks.length >= MAX_BOOKMARKS_SIZE) {
    dispatch(setDialog({
      isOpen: true,
      status: 'ALERT',
      message: `북마크는 최대 ${MAX_BOOKMARKS_SIZE}개까지 저장할 수 있습니다.`,
      title: '북마크 저장에 실패했습니다.',
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
      dispatch(setDialog({
        isOpen: true,
        status: 'ERROR',
        message: '레포지토리에 이슈가 없습니다.',
        title: '북마크 저장에 실패했습니다.',
      }));

      return;
    }

    dispatch(saveBookmarks({ issues: responseIssues, repository }));

    localStorageSetBookmark(responseIssues, repository);

    dispatch(setDialog({
      isOpen: true,
      status: 'ALERT',
      message: '북마크에 저장되었습니다.',
      title: '북마크',
    }));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setDialog({
      isOpen: true,
      status: 'ERROR',
      message,
      title: '북마크 저장에 실패했습니다.',
    }));
  }
};

export const setMoreBookmarkIssues = (
  repository: RepositoryInfo,
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { bookmark: { bookmarks, selectedBookmark, page } } = getState();
  dispatch(setLoading(true));
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

    dispatch(setLoading(false));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setLoading(false));

    dispatch(setDialog({
      isOpen: true,
      status: 'ERROR',
      message,
      title: '이슈를 불러오는데 실패했습니다.',
    }));
  }
};

export default reducer;
