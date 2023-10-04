import { useAppSelector } from 'src/common/hooks/useAppSelector';
import { commentsActions, commentsSelectors } from 'src/features/comments/index';
import { appSelectors } from 'src/features/application';
import { useActions } from 'src/common/hooks/useActions';

export const useComments = () => {
  const page = useAppSelector(commentsSelectors.selectPage);
  const currentPage = useAppSelector(commentsSelectors.selectCurrentPage);
  const selectComments = useAppSelector(commentsSelectors.selectComments);
  const pageSize = useAppSelector(commentsSelectors.selectPageSize);
  const status = useAppSelector(appSelectors.selectStatus);
  const totalPages = useAppSelector(commentsSelectors.selectTotalPages) || 1;

  const numberOfComments = currentPage * (pageSize || 0);
  const currentPageComments = selectComments.slice(0, numberOfComments);

  const { fetchCurrentPage } = useActions(commentsActions);

  const onclickHandler = () => {
    fetchCurrentPage();
  };
  return {
    page,
    selectComments,
    onclickHandler,
    currentPageComments,
    numberOfComments,
    status,
    totalPages,
  };
};
