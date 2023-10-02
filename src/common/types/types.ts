import { rootReducer } from 'src/app/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export type AppRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
