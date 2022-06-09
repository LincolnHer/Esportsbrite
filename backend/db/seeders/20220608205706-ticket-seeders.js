'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Tickets', [
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Tickets', null, {});
  }
};
