import * as faker from 'faker';
import models from '../../models';
import { UserAttributes, UserInstance } from '../../models/user';
import { UserModel } from '../../models/user';

export const data = async (props = {}) => {
  const defaultProps: UserAttributes = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  };
  return Object.assign({}, defaultProps, props);
};



export const save = async (props = {}) => models.user.create(await data(props));

export const update = async (user: UserModel, props = {}) =>
  user.update(await data(props));
