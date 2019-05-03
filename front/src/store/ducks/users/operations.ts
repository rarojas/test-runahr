import { getUsers, addUser, editUser } from './types';
import { Epic } from 'redux-observable';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import api from '../../client/api';
import { AxiosResponse } from 'axios';

export const authenticated = (action: any) => {
  return new Observable(observer => {
    let token = localStorage.getItem('access_token');
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      observer.next({
        ...action,
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      throwError(new Error('No JWT in Local Storage!'));
    }
  });
};

const getUsersEpic: Epic = action$ =>
  action$.ofType(getUsers.type).pipe(
    mergeMap(authenticated),
    mergeMap((action: any) =>
      api.get('/api/user').pipe(
        map(({ data }: AxiosResponse) => getUsers.success(data)),
        catchError(err => of(getUsers.failure(err)))
      )
    )
  );

const addUserEpic: Epic = action$ =>
  action$.ofType(addUser.type).pipe(
    mergeMap(authenticated),
    mergeMap((action: any) =>
      api.post('/api/user', action.payload).pipe(
        map(({ data }) => addUser.success(data)),
        catchError(err => of(addUser.failure(err)))
      )
    )
  );

const editUserEpic: Epic = action$ =>
  action$.ofType(editUser.type).pipe(
    mergeMap(authenticated),
    mergeMap((action: any) =>
      api.put('/api/user', action.payload).pipe(
        map(({ data }) => editUser.success(data)),
        catchError(err => of(editUser.failure(err)))
      )
    )
  );

export default [getUsersEpic, addUserEpic, editUserEpic];
