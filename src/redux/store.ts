import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import bookmarkSlice from './bookmark';
import commonSlice from './common';
import repositorySlice from './repository';

export const store = configureStore({
  reducer: {
    bookmark: bookmarkSlice,
    common: commonSlice,
    repository: repositorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
