'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}

//資料庫連線
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

//動態引入modelfs
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

//設定Models之間的關聯Object.keys(db).forEach(modelName =>)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

//匯出需要的物件db.sequelize = sequelize
db.sequelize = sequelize
db.Sequelize = Sequelize

//temperate seed
db.user = require('../models/users')(sequelize, Sequelize)
db.role = require('../models/roles')(sequelize, Sequelize)
db.role.belongsToMany(db.user, {
  through: 'user_roles',
})
db.user.belongsToMany(db.role, {
  through: 'user_roles',
})
db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
