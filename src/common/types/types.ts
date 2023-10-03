import { rootReducer } from 'src/app/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export type AppRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>;

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type CommentData = {
  id: number;
  created: string;
  text: string;
  author: number;
  parent: number;
  likes: number;
};

export type AuthorsData = {
  id: number;
  name: string;
  avatar: string;
};
