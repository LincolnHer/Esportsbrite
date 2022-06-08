'use strict';
// const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'Faker@aa.io',
        username: 'Faker',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'S1mple@aa.io',
        username: 'S1mple',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'JJonak@aa.io',
        username: 'JJonak',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Faker', 'S1mple', 'JJonak'] }
    }, {});
  }
};
