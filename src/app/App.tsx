import React from 'react';
import { Comments } from 'src/features/comments/Comments';
import { store } from 'src/app/store';
import { Provider } from 'react-redux';
import s from './App.module.scss';

export const App = () => (
  <Provider store={store}>
    <main className={s.main}>
      <div className={s.container}>
        <Comments />
      </div>
    </main>
  </Provider>
);
