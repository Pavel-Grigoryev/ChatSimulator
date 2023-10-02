import { createSlice } from '@reduxjs/toolkit';
import getCommentsRequest from 'src/api/comments/getCommentsRequest';
import { createAppAsyncThunk } from 'src/common/utils/create-app-async-thunk';
import { handleServerNetworkError } from 'src/common/utils/error-utils';

// Thunks

const fetchComments = createAppAsyncThunk<{ comments: any[] }, undefined>(
  'comments/fetchComments',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const { page } = getState().comments;
    try {
      const res = await getCommentsRequest(page);
      return { comments: res.data };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const slice = createSlice({
  name: 'comments',
  initialState: {
    page: 1,
    comments: [] as any[],
    authors: [] as any[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
    });
  },
});

// Actions

export const asyncCommentsActions = { fetchComments };
