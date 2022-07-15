'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_roles', 'role_verify', {
      type: Sequelize.BOOLEAN,
      defaultValue: null,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_roles', 'role_verify')
  },
}
