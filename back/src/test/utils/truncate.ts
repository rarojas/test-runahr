import * as _ from 'lodash';
import models from '../../models';

export default async function truncate() {
  return await Promise.all(
    _.map(Object.keys(models), key => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return models[key].destroy({ where: {}, force: true });
    })
  );
}
