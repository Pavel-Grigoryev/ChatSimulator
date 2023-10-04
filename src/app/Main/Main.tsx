import React, { useEffect } from 'react';
import { Comments } from 'src/features/comments/Comments';
import { useAppSelector } from 'src/common/hooks/useAppSelector';
import { appActions, appSelectors } from 'src/features/application';
import CircularProgress from '@mui/material/CircularProgress';
import { useActions } from 'src/common/hooks/useActions';
import { ErrorSnackbar } from 'src/common/components/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress';
import { circularProgressSX, linProgressSX } from 'src/common/styles/sx/sx_styles';
import { TotalActivities } from 'src/features/comments/TotalActivities';
import s from './Main.module.scss';

export const Main = () => {
  const { initializeApp } = useActions(appActions);

  useEffect(() => {
    initializeApp();
  }, []);

  const isInitialized = useAppSelector(appSelectors.selectIsInitialized);
  const status = useAppSelector(appSelectors.selectStatus);

  if (!isInitialized) {
    return (
      <div className={s.loader}>
        <CircularProgress style={circularProgressSX} color="secondary" />
      </div>
    );
  }
  // debugger;
  return (
    <main className={s.main}>
      {status === 'loading' && <LinearProgress color="secondary" sx={linProgressSX} />}
      <ErrorSnackbar />
      <div className={s.container}>
        <TotalActivities />
        <Comments />
      </div>
    </main>
  );
};
