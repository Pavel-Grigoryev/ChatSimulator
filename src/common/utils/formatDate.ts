import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  const commentDate = dayjs(date);
  const dateNow = dayjs();

  const diffHours = dateNow.diff(commentDate, 'h');
  const formattedDate = commentDate.format('DD.MM.YYYY. HH:mm:ss');
  return { diffHours, formattedDate };
};
