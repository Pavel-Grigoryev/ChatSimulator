import { slice } from 'src/features/application/app-slice';

const appReducer = slice.reducer;
const appActions = {
  ...slice.actions,
};

export { appReducer, appActions };
