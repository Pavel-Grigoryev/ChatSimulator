import { slice, appAsyncActions } from 'src/features/application/app-slice';
import * as appSelectors from './app-selectors';

const appReducer = slice.reducer;
const appActions = {
  ...slice.actions,
  ...appAsyncActions,
};

export { appReducer, appActions, appSelectors };
