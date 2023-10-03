import { slice, asyncCommentsActions } from './comments-slice';
import * as commentsSelectors from './comments-selectors';

const commentsReducer = slice.reducer;

const commentsActions = {
  ...asyncCommentsActions,
  ...slice.actions,
};

export { commentsReducer, commentsActions, commentsSelectors };
