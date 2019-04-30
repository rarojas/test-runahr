import { UserReducer } from './ducks/users/types';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as root from './ducks';

import { reducer as formReducer } from 'redux-form';
import { AuthRecord } from './ducks/authentication/types';

export interface State {
  authentication: AuthRecord;
  users: UserReducer;
  form: any;
}

export const rootEpic = combineEpics(...root.operations);

export const rootReducer = combineReducers<State>({
  ...root.reducers,
  form: formReducer
});
