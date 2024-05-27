'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('contactsCategories', [
      {
        name: 'Default',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Friends',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Family',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Colleagues',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Close Friends',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contactsCategories', null, {})
  }
};
