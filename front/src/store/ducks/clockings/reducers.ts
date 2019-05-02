import { logout } from '../authentication/types';
import { AnyAction } from 'redux';
import * as types from './types';
import createReducer from '../../utils/createReducer';
import Immutable, { Map, List } from 'immutable';

const ClockingRecord = Immutable.Record({
  id: 0,
  time: new Date(),
  type: ''
});

const ClockingsReducer = Immutable.Record({
  clockings: Map<string, List<types.Clocking>>(),
  loading: false
})();

export function toList<T>(obj: [], record: any) {
  return obj.map(item => record(item));
}

const clockings = createReducer(ClockingsReducer)({
  [types.getReport.success.type]: (
    state: types.ClockingReducer,
    { payload: { id, clockings } }: AnyAction
  ) =>
    state
      .setIn(['clockings', id], List(toList(clockings, ClockingRecord)))
      .set('loading', false),

  [types.getReport.failure.type]: (
    state: types.ClockingReducer,
    action: AnyAction
  ) => state.set('loading', false),

  [types.getReport.type]: (state: types.ClockingReducer, action: AnyAction) =>
    state.set('loading', true)
});

export default clockings;
