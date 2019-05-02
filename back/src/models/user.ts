import * as bcrypt from 'bcrypt';
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes/index';

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance
  extends Sequelize.Instance<UserAttributes>,
    UserAttributes {
  validPassword: (password: string) => Promise<boolean>;
  toJSON: () => any;
}

export interface UserModel
  extends Sequelize.Model<UserInstance, UserAttributes> {
  prototype?: {
    validPassword: (password: string) => Promise<boolean>;
    toJSON: () => any;
  };
  findByLogin?(login: string): Promise<UserInstance | undefined>;
}

const hashPassword = (user: UserInstance) => {
  if (user.password)
    return bcrypt
      .hash(user.password, 10)
      .then((hash: string) => (user.password = hash))
      .catch(err => {
        throw new Error(err);
      });
};

const UserFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'employe'
    }
  };

  const User: UserModel = sequelize.define<UserInstance, UserAttributes>(
    'user',
    attributes,
    {
      defaultScope: {
        attributes: { exclude: ['password'] }
      },
      scopes: {
        withPassword: {
          attributes: {
            include: [],
            exclude: []
          }
        }
      }
    }
  );

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.dataValues.password);
  };

  User.prototype.toJSON = function() {
    const userObj = Object.assign({}, this.dataValues);
    delete userObj.password;
    return userObj;
  };

  User.associate = models => User.hasMany(models.clocking);
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  User.findByLogin = async (
    login: string
  ): Promise<UserInstance | undefined> => {
    let user = await User.scope('withPassword').findOne({
      where: { username: login }
    });
    if (!user) {
      user = await User.scope('withPassword').findOne({
        where: { email: login }
      });
    }
    return user;
  };
  return User;
};

export default UserFactory;
