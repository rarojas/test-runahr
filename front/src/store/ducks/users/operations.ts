import { getUsers, addUser, editUser, checkUser } from './types';
import { Epic } from 'redux-observable';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { axios } from '../../client/axios';
import { AxiosResponse } from 'axios';

export const authenticated = (action: any) => {
  return new Observable(observer => {
    let token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
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
      axios.get('/api/user').pipe(
        map(({ data }: AxiosResponse) => getUsers.success(data)),
        catchError(err => of(getUsers.failure(err)))
      )
    )
  );

const addUserEpic: Epic = action$ =>
  action$.ofType(addUser.type).pipe(
    mergeMap(authenticated),
    mergeMap((action: any) =>
      axios.post('/api/user', action.payload).pipe(
        map(({ data }) => addUser.success(data)),
        catchError(err => of(addUser.failure(err)))
      )
    )
  );

const editUserEpic: Epic = action$ =>
  action$.ofType(editUser.type).pipe(
    mergeMap(authenticated),
    mergeMap((action: any) =>
      axios.put('/api/user', action.payload).pipe(
        map(({ data }) => editUser.success(data)),
        catchError(err => of(editUser.failure(err)))
      )
    )
  );

const checkUserEpic: Epic = action$ =>
  action$.ofType(checkUser.type).pipe(
    mergeMap(authenticated),
    mergeMap(({ payload }: any) =>
      axios.post('/api/check/', payload).pipe(
        map(({ data }) => checkUser.success(data)),
        catchError(err => of(checkUser.failure(err)))
      )
    )
  );

const getReportEpic: Epic = action$ =>
  action$.ofType(checkUser.type).pipe(
    mergeMap(authenticated),
    mergeMap(({ payload: params }: any) => {
      const config = {
        params
      };
      return axios.get('/api/user/report', config).pipe(
        map(({ data }) => checkUser.success(data)),
        catchError(err => of(checkUser.failure(err)))
      );
    })
  );

export default [
  getUsersEpic,
  addUserEpic,
  editUserEpic,
  checkUserEpic,
  getReportEpic
];
