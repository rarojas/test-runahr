import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
//@ts-ignore
import { BootstrapBaseCss } from 'styled-base-components';
import configureStore from './store/store';
import Loader from './components/Suspense';
import Router from './router';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BootstrapBaseCss />
    {
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    }
  </Provider>
);

export default App;
