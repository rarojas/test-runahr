import { DbInterface } from './../typings/DbInterface/index.d';
import * as Sequelize from 'sequelize';
import UserFactory from './user';
import ClockingFactory from './clocking';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

export const createModels = (): DbInterface => {
  //const { database, username, password, params } = sequelizeConfig;

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize.Sequelize(
      process.env[config.use_env_variable],
      config
    );
  } else {
    sequelize = new Sequelize.Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
  const db: DbInterface = {
    sequelize,
    Sequelize,
    user: UserFactory(sequelize, Sequelize),
    clocking: ClockingFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

export default createModels();
