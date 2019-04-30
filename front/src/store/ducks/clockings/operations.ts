import { authenticated } from './../users/operations';
import { getReport, checkUser } from './types';
import { Epic } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { axios } from '../../client/axios';

const checkUserEpic: Epic = action$ =>
  action$.ofType(checkUser.type).pipe(
    mergeMap(authenticated),
    mergeMap(({ payload }: any) =>
      axios.post('/api/clocking/check', payload).pipe(
        map(({ data }) => checkUser.success(data)),
        catchError(err => of(checkUser.failure(err)))
      )
    )
  );

const getReportEpic: Epic = action$ =>
  action$.ofType(getReport.type).pipe(
    mergeMap(authenticated),
    mergeMap(({ payload: params }: any) => {
      const config = {
        params
      };
      return axios.get('/api/clocking/me', config).pipe(
        map(({ data }) =>
          getReport.success({
            userId: params.userId,
            clockings: data
          })
        ),
        catchError(err => of(getReport.failure(err)))
      );
    })
  );

export default [getReportEpic, checkUserEpic];
