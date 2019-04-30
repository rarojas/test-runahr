import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import Loader from './components/Suspense';
import 'react-table/react-table.css'

//@ts-ignore
import { BootstrapBaseCss } from 'styled-base-components';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BootstrapBaseCss />
    {
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    }
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
