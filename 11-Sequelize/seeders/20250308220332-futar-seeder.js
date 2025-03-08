'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Futars', [
      { fazon: 1, fnev: 'Hurrikán', ftel: '+36 408-3654' },
      { fazon: 2, fnev: 'Gyalogkakukk', ftel: '+36 471-6098' },
      { fazon: 3, fnev: 'Gömbvillám', ftel: '+36 613-2845' },
      { fazon: 4, fnev: 'Szélvész', ftel: '+36 855-5334' },
      { fazon: 5, fnev: 'Imperial', ftel: '+36 358-3198' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Futars', null, {});
  }
};
