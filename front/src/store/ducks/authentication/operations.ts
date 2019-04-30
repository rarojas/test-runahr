import { Epic } from 'redux-observable';
import { login, logout } from './types';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { saveToken, deleteToken } from '../../utils/Auth';
import { axios, handleError } from '../../client/axios';

const loginEpic: Epic = action$ =>
  action$.ofType(login.type).pipe(
    mergeMap(action => {
      const { resolve = undefined, reject = undefined } = action.meta || {};
      return axios.post('http://localhost:4000/login', action.payload).pipe(
        map(({ data }: any) => {
          const payload = saveToken(data.token, data.user);
          if (resolve) resolve(payload);
          return login.success(payload);
        }),
        catchError(err => {
          if (reject) reject({ _error: handleError(err) });
          return of(login.failure(err));
        })
      );
    })
  );

const logoutEpic: Epic = action$ =>
  action$.ofType(logout.type).pipe(
    mergeMap((action: any) => {
      axios.defaults.headers['Authorization'] = undefined;
      deleteToken();
      return of(logout.success());
    })
  );

export default [loginEpic, logoutEpic];
