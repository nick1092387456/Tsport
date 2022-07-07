const db = require('../models')
const users = require('../models/users')
const ROLES = db.ROLES
const USERS = db.USERS

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  //Username
  const username = await USERS.findOne({
    where: {
      username: req.body.username,
    },
  })
  if (username) {
    res.status(400).send({
      message: 'Failed! Username is already in use!',
    })
    return
  }
  //Email
  const email = await USERS.findOne({
    where: {
      email: req.body.email,
    },
  })
  if (email) {
    res.status(400).send({
      message: 'Failed Email is already in use!',
    })
    return
  }
  next()
}

checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + req.body.roles[i],
        })
        return
      }
    }
  }
  next()
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
}

module.exports = verifySignUp
