import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Book, BookList } from '../../app/type';
import { FetchParams, fetchThirtyBooks } from './booksAPI';

type BookState = {
  bookList: Book[];
  status: 'idle' | 'loading' | 'failed';
  statusOfLoadMore: 'idle' | 'loading' | 'failed';
  totalItems: number;
}

const initialState: BookState = {
  bookList: [],
  status: 'idle',
  statusOfLoadMore: 'idle',
  totalItems: 0,
};

export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (fetchParams: FetchParams) => {
    const response = await fetchThirtyBooks(fetchParams);
    return response;
  }
);

export const fetchMoreBooks = createAsyncThunk(
  'book/fetchMoreBooks',
  async (fetchParams: FetchParams) => {
    const response = await fetchThirtyBooks(fetchParams);
    return response;
  }
);

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    filterBooks(state: BookState, action: PayloadAction<Book[]>) {
      state.bookList = [...action.payload];
      state.totalItems = state.bookList.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state: BookState) => {
        state.status = 'loading';
      })
      .addCase(fetchMoreBooks.pending, (state: BookState) => {
        state.statusOfLoadMore = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state: BookState, action: PayloadAction<BookList | undefined>) => {
        state.status = 'idle';
        if (action.payload) {
          state.bookList = [...action.payload.items];
          state.totalItems = action.payload.totalItems;
        }
      })
      .addCase(fetchMoreBooks.fulfilled, (state: BookState, action: PayloadAction<BookList | undefined>) => {
        state.statusOfLoadMore = 'idle';
        if (action.payload) {
          state.bookList = [...state.bookList, ...action.payload.items];
          state.totalItems = action.payload.totalItems;
        }
      })
      .addCase(fetchBooks.rejected, (state: BookState) => {
        state.status = 'failed';
      })
      .addCase(fetchMoreBooks.rejected, (state: BookState) => {
        state.statusOfLoadMore = 'failed';
      });
  },
});

export const { filterBooks } = bookSlice.actions;
export const selectBooks = (state: RootState) => state.book.bookList;

export default bookSlice.reducer;