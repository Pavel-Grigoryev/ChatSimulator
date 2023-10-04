import { formatDate, getFinalCommentDateText } from 'src/common/utils';

export const useFormatDate = (date: string, hoursLimit: number) => {
  const { diffHours, formattedDate } = formatDate(date);
  return getFinalCommentDateText(diffHours, hoursLimit, formattedDate);
};
