import React from 'react';
import { store } from 'src/app/store';
import { Provider } from 'react-redux';
import { Main } from 'src/app/Main';

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
