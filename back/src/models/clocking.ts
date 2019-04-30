import { SequelizeAttributes } from './../typings/SequelizeAttributes/index.d';
import * as Sequelize from 'sequelize';

export interface ClockingAttributes {
  id?: number;
  time: Date;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
    }
  };

  const Clocking = sequelize.define<ClockingInstance, ClockingAttributes>(
    'clocking',
    attributes,
    {}
  );
  Clocking.associate = models => Clocking.belongsTo(models.clocking);

  return Clocking;
};

export default ClockingFactory;
