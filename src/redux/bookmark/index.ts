import { createSlice } from '@reduxjs/toolkit';

import { getIssue } from '../../service/getIssue';

import { convertIssue } from '../../utils/convertIssue';
import { alreadyExistsIn } from '../../utils/alreadyExistsIn';
import { localStorageSetBookmark } from '../../utils/localStorageSetBookmark';

import { setDialog } from '../common';

import { AppDispatch, RootState } from '../store';

import { Bookmark, loadIssueProps } from './type';

const MAX_BOOKMARKS_SIZE = 4;

interface BookmarkState {
  bookmarks: Bookmark[];
  selectedBookmark?: Bookmark;
}

export const initialState: BookmarkState = {
  bookmarks: JSON.parse(localStorage.getItem('bookmark') as string) ?? [],
  selectedBookmark: undefined,
};

const { actions, reducer } = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    saveBookmarks: (state, { payload: bookmark }) => ({
      ...state,
      bookmarks: [...state.bookmarks, bookmark],
    }),
    selectBookmark: (state, { payload: id }) => {
      if (state.selectedBookmark?.repository.id === id) {
        return state;
      }

      const bookmark = state.bookmarks.find(({
        repository,
      }) => repository.id === id);

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

export const setBookmark = ({
  owner,
  repo,
  repository,
}: loadIssueProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
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
    const { data } = await getIssue({ owner, repo });

    const filteredIssue = convertIssue(data);

    dispatch(saveBookmarks({ issues: filteredIssue, repository }));

    localStorageSetBookmark(filteredIssue, repository);

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

export default reducer;
