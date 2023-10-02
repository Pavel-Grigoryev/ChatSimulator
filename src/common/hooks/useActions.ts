import { useMemo } from 'react';

import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from './useAppDispatch';

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

export const useActions = <T extends ActionCreatorsMapObject>(actions: T): BoundActions<T> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};
