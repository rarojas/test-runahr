import { createStore, applyMiddleware } from 'redux';
import { rootReducer, rootEpic, State } from './root';
import { createEpicMiddleware } from 'redux-observable';
import { compose } from 'redux';
import { login } from './ducks/authentication/types';
import { getToken } from './utils/Auth';

export default function configureStore() {
  const composeEnhancers =
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const epicMiddleware = createEpicMiddleware<any, any, State, any>();

  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  getToken(store.dispatch);

  epicMiddleware.run(rootEpic);
  return store;
}
