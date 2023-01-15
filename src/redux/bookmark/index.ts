import { createSlice } from '@reduxjs/toolkit';

import { getIssue } from '../../service/getIssue';

import { convertIssue } from "../../utils/convertIssue";
import { duplicateDetection } from '../../utils/duplicateDetection';
import { localStorageSetBookmark } from "../../utils/localStorageSetBookmark";

import { setDialog } from '../common';

import { AppDispatch, RootState } from '../store';

import { Bookmark, Bookmarks, loadIssueProps } from "./type";

export const initialState: Bookmark = {
  bookmarks: JSON.parse(localStorage.getItem('bookmark') as string) ?? [],
};

const { actions, reducer } = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    saveBookmark: (state, { payload }) => {
      const bookmark = { repository: payload.repository, issues: payload.issues };

      return {
        ...state,
        bookmarks: [...state.bookmarks, bookmark] as Bookmarks[],
      };
    },
  },
});

export const {
  saveBookmark,
} = actions;

export default reducer;

export const setBookmark = ({ owner, repo, repository }
  : loadIssueProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { bookmark: { bookmarks } } = getState();

  if (duplicateDetection(repository)) {
    dispatch(setDialog({
      isOpen: true,
      status: 'ALERT',
      message: '이미 북마크에 저장되었습니다.',
      title: '북마크 저장에 실패했습니다.',
    }));

    return;
  }

  if (bookmarks.length >= 4) {
    dispatch(setDialog({
      isOpen: true,
      status: 'ALERT',
      message: '북마크는 최대 4개까지 저장할 수 있습니다.',
      title: '북마크 저장에 실패했습니다.',
    }));

    return;
  }

  try {
    const { data } = await getIssue({ owner, repo });

    const filteredIssue = convertIssue(data);

    dispatch(saveBookmark({ issues: filteredIssue, repository }));

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
