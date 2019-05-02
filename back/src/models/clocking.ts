import { SequelizeAttributes } from './../typings/SequelizeAttributes/index.d';
import * as Sequelize from 'sequelize';
import models from '.';

export interface ClockingAttributes {
  id?: number;
  time: Date;
  type: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClockingModel
  extends Sequelize.Model<ClockingInstance, ClockingAttributes> {}
export interface ClockingInstance
  extends Sequelize.Instance<ClockingAttributes>,
    ClockingAttributes {}

const ClockingFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ClockingInstance, ClockingAttributes> => {
  const attributes: SequelizeAttributes<ClockingAttributes> = {
    time: {
      type: DataTypes.DATE
    },
    type: {
      type: DataTypes.ENUM,
      values: ['IN', 'OUT']
    },
    userId: {
      type: Sequelize.INTEGER
    }
  };

  const Clocking = sequelize.define<ClockingInstance, ClockingAttributes>(
    'clocking',
    attributes,
    {}
  );
  Clocking.associate = (models: Sequelize.Models) =>
    Clocking.belongsTo(models.user);

  return Clocking;
};

export default ClockingFactory;
