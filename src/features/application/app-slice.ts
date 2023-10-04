import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from 'src/common/types';
import { createAppAsyncThunk } from 'src/common/utils/create-app-async-thunk';
import { commentsActions } from 'src/features/comments';

// Thunks
export const initializeApp = createAppAsyncThunk<void, undefined>(
  'app/initializeApp',
  async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const { page } = getState().comments;
    const res1 = dispatch(commentsActions.fetchComments({ page }));
    const res2 = dispatch(commentsActions.fetchAuthors());
    await Promise.all([res1, res2]);
  }
);

export const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'loading' as RequestStatus,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatus }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state) => {
        state.isInitialized = true;
      })
      .addMatcher(
        isPending(commentsActions.fetchComments, commentsActions.fetchAuthors),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isFulfilled(commentsActions.fetchComments, commentsActions.fetchAuthors),
        (state) => {
          state.status = 'succeeded';
        }
      )
      .addMatcher(isRejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Some error occurred';
      });
  },
});

// Actions

export const appAsyncActions = { initializeApp };
export type InitialAppState = ReturnType<typeof slice.getInitialState>;
