'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Categories';
    /**
     * Add seed commands here.
     *
     * Example:
     */
   await queryInterface.bulkInsert(options, [

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
    options.tableName = 'Categories';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
