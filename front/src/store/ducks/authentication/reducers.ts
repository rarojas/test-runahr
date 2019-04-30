import { AnyAction } from 'redux';
import actions from './types';
import { AuthRecord, LoginSuccess } from './types';
import createReducer from '../../utils/createReducer';
import Immutable from 'immutable';

const AuthReducer = Immutable.Record({
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  isAdmin: false
})();

const authReducer = createReducer(AuthReducer)({
  [actions.login.type]: (state: AuthRecord) => state.set('loading', true),
  [actions.login.success.type]: (
    state: AuthRecord,
    { payload }: LoginSuccess
  ) =>
    state
      .set('user', payload.user)
      .set('token', payload.token)
      .set('isAuthenticated', true)
      .set('isAdmin', payload.isAdmin)
      .set('loading', false),

  [actions.login.failure.type]: (state: AuthRecord) =>
    state.set('loading', false),
  [actions.logout.success.type]: () => AuthReducer
});

export default authReducer;
