import { AppRootState } from 'src/common/types';
import { createSelector } from 'reselect';

export const selectComments = (state: AppRootState) => state.comments.comments;

export const selectCurrentPage = (state: AppRootState) => state.comments.currentPage;
export const selectRenderedComment = (state: AppRootState) => state.comments.renderedComment;
export const selectPageSize = (state: AppRootState) => state.comments.pageSize;
export const selectFirstComments = createSelector(selectComments, (state) =>
  state.filter((comm) => comm.parent === null)
);

export const selectLikesSum = createSelector(selectComments, (state) =>
  state.reduce((acc, currentVal) => acc + currentVal.likes, 0)
);
export const selectNestedComments = createSelector(selectComments, (state) =>
  state.filter((comm) => comm.parent !== null)
);

export const selectPage = (state: AppRootState) => state.comments.page;
export const selectAuthors = (state: AppRootState) => state.comments.authors;
export const selectTotalPages = (state: AppRootState) => state.comments.totalPages;
