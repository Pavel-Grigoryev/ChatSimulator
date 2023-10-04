export const getFinalCommentText = (coments: number) => {
  if (coments === 1 || coments % 10 === 1) {
    return `${coments} комментарий`;
  }
  if (coments > 1 && coments < 5) {
    return `${coments} комментария`;
  }
  return `${coments} комментариев`;
};
