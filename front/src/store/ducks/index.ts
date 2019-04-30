import * as authentication from './authentication';
import * as users from './users';

export const reducers = {
  authentication: authentication.default,
  users: users.default
};

export const operations = [...authentication.operations, ...users.operations];
