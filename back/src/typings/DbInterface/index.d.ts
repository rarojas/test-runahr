import { ClockingAttributes, ClockingInstance } from './../../models/clocking';
import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance, UserModel } from '../../models/user';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  user: UserModel;
  clocking: Sequelize.Model<ClockingInstance, ClockingAttributes>;
}
