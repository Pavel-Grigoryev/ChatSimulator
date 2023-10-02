import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commentsReducer } from 'src/features/comments';
import { appReducer } from 'src/features/application';

export const rootReducer = combineReducers({
  app: appReducer,
  comments: commentsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// @ts-ignore
window.store = store;
