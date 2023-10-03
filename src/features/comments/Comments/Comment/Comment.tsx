import React, { FC, useEffect, useState } from 'react';
import { CommentData } from 'src/common/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { returnFinalCommentDateText } from 'src/common/utils/returnFinalCommentDateText';
import { SHOW_FULL_DATE_AFTER } from 'src/common/constants';
import { Author } from 'src/features/comments/Comments/Comment/Author';
import { useAppSelector } from 'src/common/hooks/useAppSelector';
import { commentsActions, commentsSelectors } from 'src/features/comments/index';
import cn from 'classnames';
import { useActions } from 'src/common/hooks/useActions';
import s from './Comment.module.scss';

dayjs.extend(localizedFormat);

type Props = {
  comment: CommentData;
  numberOfComments: number;
};

export const Comment: FC<Props> = ({ comment, numberOfComments }) => {
  const { addRenderedComment } = useActions(commentsActions);

  const renderedComment = useAppSelector(commentsSelectors.selectRenderedComment);

  const commentDate = dayjs(comment.created);
  dayjs.locale('ru');
  const dateNow = dayjs();

  const diffHours = dateNow.diff(commentDate, 'h');
  const formattedDate = commentDate.format('DD.MM.YYYY. HH:mm:ss');

  const finalCommentDate = returnFinalCommentDateText(
    diffHours,
    SHOW_FULL_DATE_AFTER,
    formattedDate
  );

  const nestedComments = useAppSelector(commentsSelectors.selectNestedComments);
  const nestedComment = nestedComments.find((comm) => comm.parent === comment.id);

  useEffect(() => {
    addRenderedComment();
  }, []);

  return (
    <div className={cn(s.nestedBlock, { [s.notFirstBlock]: comment.parent })}>
      <Author authorId={comment.author} />
      <div>{finalCommentDate}</div>
      <p>{comment.text}</p>
      <p>{comment.likes}</p>

      {/* {nestedComment && ( */}
      {/*  <div className={cn(s.nestedBlock, { [s.notFirstBlock]: !comment.parent })}> */}
      {/*    <Comment comment={nestedComment} numberOfComments={numberOfComments} /> */}
      {/*  </div> */}
      {/* )} */}
    </div>
  );
};
