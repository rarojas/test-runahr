import Immutable from 'immutable';
import { factory } from '../../utils';

export interface User {
  username: string;
  id: number;
  email: string;
  role: string;
  isAdmin: boolean;
}

export type UserRecord = Immutable.RecordOf<User>;

export interface UserState {
  users: Immutable.Map<string, User>;
  loading: boolean;
}

export type UserReducer = Immutable.RecordOf<UserState>;

export const getUsers = factory.asynchronous('GET_USERS');
export const addUser = factory.asynchronous('ADD_USER');
export const editUser = factory.asynchronous('EDIT_USER');
export const checkUser = factory.asynchronous('CHECK_USER');
export const getReport = factory.asynchronous('GET_REPORT');

export default { getUsers, addUser, editUser, checkUser, getReport };
