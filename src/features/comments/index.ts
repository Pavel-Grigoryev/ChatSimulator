import { slice, asyncCommentsActions } from './comments-slice';

const commentsReducer = slice.reducer;

const commentsActions = {
  ...asyncCommentsActions,
};

export { commentsReducer, commentsActions };
