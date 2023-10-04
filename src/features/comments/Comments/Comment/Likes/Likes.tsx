import React, { memo } from 'react';
import fillHeart from 'src/assets/ph_heart-fill.png';
import lightHeart from 'src/assets/ph_heart-light.png';
import s from './Likes.module.scss';

type Props = {
  likes: number;
  onclickHandler: () => void;
  isLiked: boolean;
};
export const Likes = memo(({ likes, onclickHandler, isLiked }: Props) => {
  const imgSrc = isLiked ? fillHeart : lightHeart;

  return (
    <button type="button" onClick={onclickHandler} className={s.likes}>
      <img src={imgSrc} alt="" />
      {likes}
    </button>
  );
});
