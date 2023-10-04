import React, { FC, useCallback } from 'react';
import { CommentDataSlice } from 'src/common/types';
import { SHOW_FULL_DATE_AFTER } from 'src/common/constants';
import { Author } from 'src/features/comments/Comments/Comment/Author';
import cn from 'classnames';
import { useFormatDate } from 'src/features/comments/Comments/Comment/hooks';
import { Likes } from 'src/features/comments/Comments/Comment/Likes';
import { useActions } from 'src/common/hooks/useActions';
import { commentsActions } from 'src/features/comments/index';
import s from './Comment.module.scss';

type Props = {
  comment: CommentDataSlice;
};

export const Comment: FC<Props> = ({ comment }) => {
  const finalCommentDate = useFormatDate(comment.created, SHOW_FULL_DATE_AFTER);

  const { setIsLiked } = useActions(commentsActions);

  const onclickHandler = useCallback(() => {
    setIsLiked({ id: comment.id });
  }, []);

  return (
    <li className={cn(s.commentBlock, { [s.notFirstBlock]: comment.parent })}>
      <div className={s.authorWrapper}>
        <Author authorId={comment.author} />
      </div>
      <p className={s.date}>{finalCommentDate}</p>
      <p>{comment.text}</p>
      <div className={s.likesBlock}>
        <Likes likes={comment.likes} isLiked={comment.isLiked} onclickHandler={onclickHandler} />
      </div>
    </li>
  );
};
