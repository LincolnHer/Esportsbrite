'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Tickets';
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        userId: 1,
        quantity: 1,
      },
      {
        eventId: 2,
        userId: 1,
        quantity: 1,
      },
      {
        eventId: 6,
        userId: 1,
        quantity: 1,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Tickets';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
