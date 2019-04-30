import { AnyAction } from 'redux';

export default (initialState: any) => (reducerMap: any) => (
  state = initialState,
  action: AnyAction
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};
