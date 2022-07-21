'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert('Categories', [

      {
        type: 'All',
      },
      {
        type: 'Digital card games',
      },
      {
        type: 'Fighting',
      },
      {
        type: 'First-person shooter',
      },
      {
        type: 'Multiplayer online battle arena',
      },
      {
        type: 'Racing games',
      },
      {
        type: 'Real-time strategy',
      },
      {
        type: 'Sports',
      },
      {
        type: 'Third-person shooter',
      },
      {
        type: 'Others',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
