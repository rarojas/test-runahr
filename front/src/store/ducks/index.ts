import * as authentication from './authentication';
import * as users from './users';
import * as clockings from './clockings';

export const reducers = {
  authentication: authentication.default,
  users: users.default,
  clockings: clockings.default
};

export const operations = [
  ...authentication.operations,
  ...users.operations,
  ...clockings.operations
];
