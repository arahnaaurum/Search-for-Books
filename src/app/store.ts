import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookReducer from '../features/books/booksSlice';

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
