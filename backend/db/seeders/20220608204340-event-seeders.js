'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Events';
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(options, [
      {
        hostId: 1,
        // category: "Multiplayer online battle arena",
        categoryId: 5,
        date: "2022-10-05",
        description: "The annual professional League of Legends world championship tournament Finals hosted by Faker and is the culmination of each season.",
        location: "1 Warriors Way, San Francisco, CA 94158",
        name: "Worlds 2022",
        imageUrl: "https://cdn.oneesports.gg/cdn-data/2022/09/LeagueofLegends_Worlds2022_OneandOnly_Theme-1024x576.jpg",
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
        imageUrl: "https://pbs.twimg.com/profile_images/1397448638016606210/BZwHkBHe_400x400.jpg",
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
        imageUrl: "https://cdn.oneesports.gg/cdn-data/2023/01/LeagueOfLegends_2023_MIdSeasonInvitational_Teams-1024x576.jpg",
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
        imageUrl: "https://gumlet.assettype.com/afkgaming%2F2022-12%2Fe991fa76-4767-44d5-9c43-d233f77936bd%2FUntitled_design___2022_12_09T093451_460__1_.jpg?compress=true&dpr=1&w=480",
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
        imageUrl: "https://images.blz-contentstack.com/v3/assets/blt321317473c90505c/blt6d1bc00d2948ae46/6296a036e3aff11139664a0a/OWL_KickoffClash_EditorialHeader_1920x1080.jpg",
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
        imageUrl: "https://pbs.twimg.com/media/EbH8GtOU8AEFhun.jpg",
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
        imageUrl: "https://d1lss44hh2trtw.cloudfront.net/assets/article/2022/08/11/super-smash-con-2022-streams-schedule-brackets-prize-pool_feature.jpg",
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
        imageUrl: "https://esports-news.co.uk/wp-content/uploads/2022/11/iem-rio-major-logo-1024x529.jpg",
        price: 35,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Events';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
