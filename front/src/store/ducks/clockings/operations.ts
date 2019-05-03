import { Action } from './../../utils/factory.types';
import { State } from './../../root';
import { authenticated } from './../users/operations';
import { getReport, checkUser, displaySuccess } from './types';
import { Epic } from 'redux-observable';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of, from, empty } from 'rxjs';
import api from '../../client/api';
import Swal from 'sweetalert2';

const checkUserEpic: Epic = action$ =>
  action$.ofType(checkUser.type).pipe(
    mergeMap(authenticated),
    mergeMap(({ payload }: any) =>
      api.post('/api/clocking/check', payload).pipe(
        mergeMap(({ data }) => [checkUser.success(data), displaySuccess()]),
        catchError(err => of(checkUser.failure(err)))
      )
    )
  );

const getReportEpic: Epic<any, any, State, any> = (action$, state$) =>
  action$.ofType(getReport.type).pipe(
    mergeMap(authenticated),
    mergeMap(() =>
      api.get('/api/clocking/me').pipe(
        map(({ data }) =>
          getReport.success({
            id: state$.value.authentication.getIn(['user', 'id']),
            clockings: data
          })
        ),
        catchError(err => of(getReport.failure(err)))
      )
    )
  );

const displayNotificationEpic: Epic = action$ =>
  action$.ofType(displaySuccess.type).pipe(
    switchMap(({ payload = 'Your work has been saved' }: Action) =>
      from(
        Swal.fire({
          type: 'success',
          title: payload,
          showConfirmButton: false,
          timer: 1500
        })
      ).pipe(_ => empty())
    )
  );

export default [getReportEpic, checkUserEpic, displayNotificationEpic];
