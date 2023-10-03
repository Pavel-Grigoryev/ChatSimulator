export const returnFinalCommentDateText = (
  diffHours: number,
  hoursLimit: number,
  formattedDate: string
) => {
  if (diffHours > hoursLimit) {
    return formattedDate;
  }
  if (diffHours === 1) {
    return `${diffHours} час назад`;
  }
  if (diffHours > 1 && diffHours < 5) {
    return `${diffHours} часа назад`;
  }
  if (diffHours < 1) {
    return 'меньше часа назад';
  }
  return `${diffHours} часов назад`;
};
