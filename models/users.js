'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.role, {
        through: 'user_roles',
      })
    }
  }
  User.init(
    {
      // Model attributes are defined here
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role_verify: DataTypes.BOOLEAN,
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'user', // We need to choose the model name
      tableName: 'users',
      underscored: true,
    }
  )
  return User
}
