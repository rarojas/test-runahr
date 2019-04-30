import { AnyAction } from 'redux';
import Immutable from 'immutable';
import { factory } from '../../utils';
import { User } from '../users/types';

export interface AuthState {
  token?: string;
  user?: any;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

export type AuthRecord = Immutable.RecordOf<AuthState>;

export interface LoginSuccess extends AnyAction {
  payload: {
    isAdmin: boolean;
    isAuthenticated: boolean;
    token: string;
    user: User;
  };
}

export const login = factory.asynchronous('LOGIN');
export const logout = factory.asynchronous('LOGOUT');

export default { login, logout };
