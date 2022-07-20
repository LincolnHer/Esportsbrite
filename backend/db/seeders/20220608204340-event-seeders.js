'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Events', [
      {
        hostId: 1,
        // category: "Multiplayer online battle arena",
        categoryId: 5,
        date: "2022-10-05",
        description: "The annual professional League of Legends world championship tournament Finals hosted by Faker and is the culmination of each season.",
        location: "1 Warriors Way, San Francisco, CA 94158",
        name: "Worlds 2022",
        imageUrl: null,
        price: 32
      },
      {
        hostId: 1,
        // category: 'Multiplayer online battle arena',
        categoryId: 5,
        date: '2022-12-10',
        description: 'Annual tournament, organized by the Korea e-Sports Association and hosted by Faker.',
        location: 'Ulsan',
        name: 'KeSpa Cup 2022',
        imageUrl: null,
        price: 30,
      },
      {
        hostId: 1,
        // category: 'Multiplayer online battle arena',
        categoryId: 5,
        date: '2023-05-10',
        description: 'Tournament for League of Legends from the culmination of the 2022 Spring Split and an interregional competition.',
        location: 'Australia',
        name: 'MSI 2023',
        imageUrl: null,
        price: 30,
      },
      {
        hostId: 1,
        // category: 'Multiplayer online battle arena',
        categoryId: 5,
        date: '2022-12-18',
        description: 'International tournament featuring fan-voted players from each of the twelve profession regions.',
        location: 'Luxor Hotel & Casino, Luxor Dr, Las Vegas, NV 89119',
        name: 'All-Star Event',
        imageUrl: null,
        price: 35
      },
      {
        hostId: 2,
        // category: 'First-person shooter',
        categoryId: 4,
        date: '2022-07-05',
        description: 'Tournament to kickoff the season of overwatch league.',
        location: '1200 Ballpark Way Suite T.9, 1200 Ballpark Way, Arlington, TX 76011',
        name: 'Overwatch League 2022 Kickoff Clash',
        imageUrl: null,
        price: 30,
      },
      {
        hostId: 2,
        // category: 'Real-time strategy',
        categoryId: 7,
        date: '2022-11-18',
        description: 'offline Global Event of the ESL Pro Tour 2022/2023',
        location: '285 Andrew Young International Blvd NW, Atlanta, GA 30313',
        name: 'Dream Hack STARCRAFT 2 Masters',
        imageUrl: null,
        price: 32,
      },
      {
        hostId: 2,
        // category: 'Fighting',
        categoryId: 3,
        date: '2022-08-11',
        description: 'Largest Smash Bros event in the world.',
        location: '4320 Chantilly Shopping Center, Chantilly, VA 20151',
        name: 'Super Smash Con',
        imageUrl: null,
        price: 34,
      },
      {
        hostId: 3,
        // category: 'First-person shooter',
        categoryId: 4,
        date: '2022-10-31',
        description: 'The eighteenth Counter-Strike: Global Offensive Major Championship.',
        location: 'Rio de Janero',
        name: 'IEM Season XVII - Rio Major 2022',
        imageUrl: null,
        price: 35,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Events', null, {});
  }
};
