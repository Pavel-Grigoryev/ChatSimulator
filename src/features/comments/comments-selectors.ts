import { AppRootState } from 'src/common/types';
import { createSelector } from 'reselect';
import { calculateSum } from 'src/common/utils';

export const selectComments = (state: AppRootState) => state.comments.comments;

export const selectCurrentPage = (state: AppRootState) => state.comments.currentPage;

export const selectPageSize = (state: AppRootState) => state.comments.pageSize;
export const selectLikesSum = createSelector(selectComments, (state) =>
  calculateSum(state, 'likes')
);

export const selectCommentsSum = createSelector(selectComments, (state) => state.length);

export const selectPage = (state: AppRootState) => state.comments.page;
export const selectAuthors = (state: AppRootState) => state.comments.authors;
export const selectTotalPages = (state: AppRootState) => state.comments.totalPages;
