import { AppRootState } from 'src/common/types';

export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized;
export const selectError = (state: AppRootState) => state.app.error;
export const selectStatus = (state: AppRootState) => state.app.status;
