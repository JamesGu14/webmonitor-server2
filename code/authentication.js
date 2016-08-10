const jwt = require('jwt-simple')
const _ = require('lodash')
const moment = require('moment')
const Config = require('../config/')
const secret = Config.get('/secret')
const Sys_user = require('../models/models').Sys_user

module.exports.login = (username, password, done) => {
  sys_user.findOne({ username: username, password: password }, function (err, _user) {
    // TODO: Add login fail handler
    if (err) {
      return done(err)
    }

    if (!_user) {
      return done(null, false, null, { message: '登录失败' })
    } 

    let payload = _.assign(_user, { expiry: moment().add(2, 'h') })
    var token = jwt.encode(payload, secret, 'HS512')

    // TODO: update last login record for the client
    return done(null, true, token)
  })
}

/**
 * Check token expiry
 */
module.exports.isOnline = (token) => {
  let payload
  try {
    payload = jwt.decode(token, secret)
  } catch (err) {
    return false
  }

  if (!payload || !payload.expiry) {
    return false
  }
  if (payload.expiry > moment()) {
    return true
  }
  
  return false
}
