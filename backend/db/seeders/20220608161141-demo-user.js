'use strict';
// const faker = require("faker");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Faker', 'S1mple', 'JJonak'] }
    }, {});
  }
};
