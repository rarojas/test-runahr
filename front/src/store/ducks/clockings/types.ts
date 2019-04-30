import Immutable from 'immutable';
import { factory } from '../../utils';

export interface Clocking {
  id: number;
  time: Date;
  type: string;
}

export type ClockingRecord = Immutable.RecordOf<Clocking>;

export interface ClockingState {
  clockings: Immutable.Map<string, Immutable.List<ClockingRecord>>;
  loading: boolean;
}

export type ClockingReducer = Immutable.RecordOf<ClockingState>;

export const getReport = factory.asynchronous('GET_REPORT');
export const checkUser = factory.asynchronous('CHECK_USER');

export default { getReport, checkUser };
