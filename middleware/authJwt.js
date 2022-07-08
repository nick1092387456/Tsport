const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.User
verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId)
  const roles = await user.getRoles()
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next()
      return
    }
  }
  res.status(403).send({
    message: 'Require Admin Role!',
  })
  return
}

isAthlete = async (req, res, next) => {
  const user = await User.findByPk(req.userId)
  const roles = await user.getRoles()
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'athlete') {
      next()
      return
    }
  }
  res.status(403).send({
    message: 'Require Athlete Role!',
  })
}

isAthleteOrAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId)
  const roles = await user.getRoles()
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'athlete') {
      next()
      return
    }
    if (roles[i].name === 'admin') {
      next()
      return
    }
  }
  res.status(403).send({
    message: 'Require Athlete or Admin Role!',
  })
}

const authJwt = {
  verifyToken,
  isAdmin,
  isAthlete,
  isAthleteOrAdmin,
}

module.exports = authJwt
