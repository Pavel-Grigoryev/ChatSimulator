import React, { useEffect, useRef, useState } from 'react';
import { useActions } from 'src/common/hooks/useActions';
import { commentsActions, commentsSelectors } from 'src/features/comments/index';
import { useAppSelector } from 'src/common/hooks/useAppSelector';
import { Comment } from 'src/features/comments/Comments/Comment';
import { START_PAGE } from 'src/common/constants';
import Button from '@mui/material/Button';
import { appSelectors } from 'src/features/application';
import { selectTotalPages } from 'src/features/comments/comments-selectors';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import s from './Comments.module.scss';

export const Comments = () => {
  const firstComments = useAppSelector(commentsSelectors.selectFirstComments);
  const page = useAppSelector(commentsSelectors.selectPage);
  const currentPage = useAppSelector(commentsSelectors.selectCurrentPage);
  const selectComments = useAppSelector(commentsSelectors.selectComments);
  const pageSize = useAppSelector(commentsSelectors.selectPageSize);
  const status = useAppSelector(appSelectors.selectStatus);
  const renderedComment = useAppSelector(commentsSelectors.selectRenderedComment);
  const totalPages = useAppSelector(commentsSelectors.selectTotalPages) || 1;

  const numberOfComments = currentPage * (pageSize || 0);
  const currentPageComments = selectComments.slice(0, numberOfComments);

  const renderedComments = currentPageComments.map((com) => {
    return <Comment key={com.id} comment={com} numberOfComments={numberOfComments} />;
  });

  const { fetchCurrentPage } = useActions(commentsActions);

  const onclickHandler = () => {
    fetchCurrentPage();
  };
  return (
    <>
      <ul>{renderedComments}</ul>
      {page <= totalPages && numberOfComments < selectComments.length && (
        <div className={s.buttonBlock}>
          <Button
            type="button"
            onClick={onclickHandler}
            variant="contained"
            fullWidth
            size="large"
            disabled={status === 'loading'}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};
