'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'role_verify', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'role_verify')
  },
}
