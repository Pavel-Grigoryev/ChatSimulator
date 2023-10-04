import React from 'react';
import { commentsSelectors } from 'src/features/comments/index';
import { useAppSelector } from 'src/common/hooks/useAppSelector';
import { getFinalCommentText } from 'src/common/utils';
import s from './TotalActivities.module.scss';

export const TotalActivities = () => {
  const likesSum = useAppSelector(commentsSelectors.selectLikesSum);
  const commentsSum = useAppSelector(commentsSelectors.selectCommentsSum);

  const commentText = getFinalCommentText(commentsSum);

  return (
    <div className={s.activBlock}>
      <div>{commentText}</div>
      <div className={s.likes}>{likesSum}</div>
    </div>
  );
};
