import React from 'react';
import { Comment } from 'src/features/comments/Comments/Comment';
import Button from '@mui/material/Button';
import { useComments } from 'src/features/comments/Comments/hooks';
import s from './Comments.module.scss';

export const Comments = () => {
  const {
    page,
    currentPageComments,
    numberOfComments,
    totalPages,
    status,
    selectComments,
    onclickHandler,
  } = useComments();

  const renderedComments = currentPageComments.map((com) => {
    return <Comment key={com.id} comment={com} />;
  });

  return (
    <>
      <ul className={s.commList}>{renderedComments}</ul>
      {page <= totalPages && numberOfComments < selectComments.length && (
        <div className={s.buttonBlock}>
          <Button
            type="button"
            onClick={onclickHandler}
            variant="contained"
            fullWidth
            size="large"
            color="secondary"
            disabled={status === 'loading'}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};
