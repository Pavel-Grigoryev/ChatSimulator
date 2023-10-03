import React from 'react';
import { selectLikesSum } from 'src/features/comments/comments-selectors';
import { useAppDispatch } from 'src/common/hooks/useAppDispatch';
import { commentsSelectors } from 'src/features/comments/index';
import { useAppSelector } from 'src/common/hooks/useAppSelector';

export const TotalActivities = () => {
  const likesSum = useAppSelector(commentsSelectors.selectLikesSum);

  return <div>{likesSum}</div>;
};
