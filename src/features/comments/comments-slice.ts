import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCommentsRequest from 'src/api/comments/getCommentsRequest';
import { createAppAsyncThunk } from 'src/common/utils/create-app-async-thunk';
import { AuthorsData, CommentData, CommentDataSlice } from 'src/common/types/types';
import { START_PAGE } from 'src/common/constants';
import dayjs from 'dayjs';
import getAuthorsRequest from 'src/api/authors/getAuthorsRequest';
import { commentsActions } from 'src/features/comments/index';

// Thunks

const fetchComments = createAppAsyncThunk<
  { comments: CommentData[]; pageSize: number; totalPages: number; page: number },
  { page: number }
>('comments/fetchComments', async (param) => {
  const res = await getCommentsRequest(param.page);
  return {
    comments: res.data,
    pageSize: res.pagination.size,
    totalPages: res.pagination.total_pages,
    page: res.pagination.page,
  };
});

const fetchAuthors = createAppAsyncThunk<{ authors: AuthorsData[] }, undefined>(
  'comments/fetchAuthors',
  async () => {
    const res = await getAuthorsRequest();
    return { authors: res };
  }
);

const fetchCurrentPage = createAppAsyncThunk<void, undefined>(
  'comments/fetchCurrentPage',
  async (param, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const { pageSize, currentPage, comments, totalPages, page } = getState().comments;
    const totPages = totalPages || 1;
    const numberOfComments = currentPage * (pageSize || 0);
    if (pageSize && comments.length > 0) {
      if (comments.length - numberOfComments > pageSize) {
        dispatch(commentsActions.setCurrentPage());
      }
      if (comments.length - numberOfComments < pageSize && page < totPages) {
        dispatch(commentsActions.fetchComments({ page: page + 1 }))
          .unwrap()
          .then(() => {
            dispatch(commentsActions.setCurrentPage());
          })
          .catch(() => {
            rejectWithValue(null);
          });
      }
      if (comments.length - numberOfComments < pageSize && page === totPages) {
        dispatch(commentsActions.setCurrentPage());
      }
    }
  }
);

export const slice = createSlice({
  name: 'comments',
  initialState: {
    page: START_PAGE,
    currentPage: START_PAGE,
    pageSize: null as null | number,
    totalPages: null as null | number,
    comments: [] as CommentDataSlice[],
    authors: [] as AuthorsData[],
  },
  reducers: {
    setCurrentPage(state) {
      state.currentPage += 1;
    },
    setIsLiked(state, action: PayloadAction<{ id: number }>) {
      const index = state.comments.findIndex((com) => com.id === action.payload.id);
      state.comments[index].isLiked = !state.comments[index].isLiked;
      if (state.comments[index].isLiked) {
        state.comments[index].likes += 1;
      } else {
        state.comments[index].likes -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        const sortedComments = action.payload.comments;
        sortedComments.sort((a, b) => {
          const dateA = dayjs(a.created).valueOf();
          const dateB = dayjs(b.created).valueOf();
          return dateB - dateA;
        });
        sortedComments.sort((a, b) => {
          const parentA = a.parent || 0;
          const parentB = b.parent || 0;
          return parentA - parentB;
        });
        const arrComments = sortedComments.map((comm) => ({ ...comm, isLiked: false }));
        state.totalPages = action.payload.totalPages;
        if (state.pageSize) {
          state.comments = [...state.comments, ...arrComments];
          state.page = action.payload.page;
        } else {
          state.comments = arrComments;
          state.pageSize = action.payload.pageSize;
        }
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authors = action.payload.authors;
      });
  },
});

// Actions
export const asyncCommentsActions = { fetchComments, fetchAuthors, fetchCurrentPage };

// Types
export type InitialCommentsState = ReturnType<typeof slice.getInitialState>;
