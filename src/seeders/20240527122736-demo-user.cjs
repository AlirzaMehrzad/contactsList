'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Users', [
      {
        fullname: 'John Doe',
        username: 'johny',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Megan Walter',
        username: 'mwalter',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Henry Cavil',
        username: 'hcavil',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Reza Sadeghi',
        username: 'rsadeghi',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
