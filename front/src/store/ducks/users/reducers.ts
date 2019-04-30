import { logout } from './../authentication/types';
import { AnyAction } from 'redux';
import * as types from './types';
import createReducer from '../../utils/createReducer';
import Immutable, { Map } from 'immutable';

const UsersRecord = Immutable.Record({
  username: '',
  id: 0,
  email: '',
  role: '',
  isAdmin: false
});

const UsersReducer = Immutable.Record({
  users: Map<string, types.User>(),
  loading: false
})();


export function toMap<T>(obj: [], key: string, record: any) {
  return obj.reduce((acc, item) => {
    return acc.set(`${item[key]}`, record(item));
  }, Map<string, T>());
}

const users = createReducer(UsersReducer)({
  [types.getUsers.success.type]: (
    state: types.UserReducer,
    action: AnyAction
  ) => state.set('users', toMap(action.payload, 'id', UsersRecord)),

  [types.addUser.type]: (state: types.UserReducer) =>
    state.set('loading', true),
  [types.addUser.failure.type]: (state: types.UserReducer) =>
    state.set('loading', false),
  [types.addUser.success.type]: (state: types.UserReducer) =>
    state.set('loading', false),

  [logout.success.type]: () => UsersReducer
});

export default users;
