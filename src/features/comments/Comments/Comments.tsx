import React, { useEffect } from 'react';
import { useActions } from 'src/common/hooks/useActions';
import { commentsActions } from 'src/features/comments/index';

export const Comments = () => {
  const { fetchComments } = useActions(commentsActions);
  useEffect(() => {
    fetchComments();
  }, []);
  return <ul>Comments</ul>;
};
