import * as faker from 'faker';
import models from '../../models';
import { ClockingAttributes, ClockingModel } from '../../models/clocking';

const data = async (props = {}) => {
  const defaultProps: ClockingAttributes = {
    type: faker.random.arrayElement(['IN', 'OUT']),
    time: faker.date.recent(),
    userId: null
  };
  return Object.assign({}, defaultProps, props);
};

export const save = async (props = {}) =>
  models.clocking.create(await data(props));

  

export const get = async ({ userId }) =>
  models.clocking.findAll({
    where: {
      userId
    }
  });
