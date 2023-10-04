import React, { FC } from 'react';
import { useAppSelector } from 'src/common/hooks/useAppSelector';
import { commentsSelectors } from 'src/features/comments/index';
import noImg from 'src/assets/noImage.png';
import s from './Author.module.scss';

type Props = {
  authorId: number;
};
export const Author: FC<Props> = ({ authorId }) => {
  const authors = useAppSelector(commentsSelectors.selectAuthors);

  const findedAuthors = authors.find((author) => author.id === authorId);

  const authorsName = findedAuthors?.name || 'no name';
  const authorsAva = findedAuthors?.avatar || noImg;

  return (
    <div className={s.authorBlock}>
      <div className={s.imgWrapper}>
        <img src={authorsAva} alt="" />
      </div>
      <h6 className={s.name}>{authorsName}</h6>
    </div>
  );
};
