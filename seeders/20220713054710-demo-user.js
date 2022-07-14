'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'admin',
          password: bcrypt.hashSync('123456', 8),
          email: 'admin@example.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'user1',
          password: bcrypt.hashSync('123456', 8),
          email: 'user1@example.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'user2',
          password: bcrypt.hashSync('123456', 8),
          email: 'user2@example.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'user3',
          password: bcrypt.hashSync('123456', 8),
          email: 'user3@example.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )

    //add user role associate through user_roles table
    const users = await queryInterface.sequelize.query(`SELECT id from users`)
    const userRows = users[0]
    await queryInterface.bulkInsert('user_roles', [
      {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userRows[0].id,
        role_id: 3,
      },
      {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userRows[1].id,
        role_id: 1,
      },
      {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userRows[1].id,
        role_id: 2,
      },
      {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userRows[2].id,
        role_id: 1,
      },
      {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userRows[2].id,
        role_id: 4,
      },
      {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userRows[3].id,
        role_id: 1,
      },
    ])

    return await queryInterface.bulkInsert(
      'roles',
      [
        {
          id: 1,
          name: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'athlete',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'coach',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('user_roles', null, {})
    await queryInterface.bulkDelete('roles', null, {})
  },
}
