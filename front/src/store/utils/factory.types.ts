import { string } from 'prop-types';
import { AnyAction, ActionCreator } from 'redux';
import { RecordOf } from 'immutable';

export enum Statuses {
  cancel = '@CANCEL',
  request = '@REQUEST',
  success = '@SUCCESS',
  failure = '@FAILURE',
  progress = '@PROGRESS'
}

export enum Properties {
  cancel = 'cancel',
  success = 'success',
  failure = 'failure',
  progress = 'progress'
}

export interface Indexed {
  [key: string]: any;
}

export interface Action<T = any> extends AnyAction {
  payload?: T;
}

export interface SynchronousCreator<T = any> {
  type: string;
  (): Action;
  <T>(payload: T, meta?: any): Action<T>;
}
type IEnumTpProp<R> = { [key in keyof typeof Properties]: R };

export interface AsynchronousCreator<T>
  extends IEnumTpProp<SynchronousCreator<T>> {
  type: string;
  (): Action;
  <T>(payload: T, meta?: any): Action<T>;
}

export interface AsyncReducer<T> {
  data: T;
  loading: boolean;
}

export interface Factory {
  synchronous<T>(type: string): SynchronousCreator<T>;

  asynchronous<T>(type: string): AsynchronousCreator<T>;

  makeAsyncReducer<T>(
    actionCreator: AsynchronousCreator<T>,
    options?: any
  ): RecordOf<AsyncReducer<T>>;
}
