'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = require('./data/user');
    const users = await Promise.all(
      usersData.map(async user => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
