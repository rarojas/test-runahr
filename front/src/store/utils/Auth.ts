import { User } from './../ducks/users/types';
import { login } from '../ducks/authentication/types';
import { parseJwt } from './JWTUtils';
import { Dispatch } from 'redux';
const TOKEN_KEY = 'access_token';

export const saveToken = (token: string, user: User) => {
  localStorage.setItem(TOKEN_KEY, token);
  return {
    user,
    isAdmin: user.isAdmin
  };
};

export const getToken = (dispatch: Dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    const user = parseJwt(token);
    dispatch(
      login.success({
        user,
        token,
        isAdmin: user.isAdmin
      })
    );
  }
};

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
