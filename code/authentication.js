const jwt = require('jwt-simple')
const _ = require('lodash')
const moment = require('moment')
const Config = require('../config/')
const secret = Config.get('/secret')
const Sys_user = require('../models/').Sys_user

module.exports.login = (username, password, done) => {
  Sys_user.findOne({ username: username, password: password }, function (err, _user) {
    // TODO: Add login fail handler
    if (err) {
      return done(err)
    }

    if (!_user) {
      return done(null, false)
    } 

    let payload = {
      expiry: moment().add(2, 'h').utc().format('YYYY-MM-DD HH:mm:ss'),
      _id: _user._id,
      username: _user.username
    }
    let token = jwt.encode(payload, secret, 'HS512')

    let profile = {
      username: _user.username
    }

    // TODO: update last login record for the client
    return done(null, true, token, profile)
  })
}

/**
 * Check token expiry
 */
module.exports.isOnline = (token, done) => {
  let payload
  try {
    payload = jwt.decode(token, secret)
  } catch (err) {
    return done(err)
  }

  if (!payload || !payload.expiry) {
    return done(null, null, 'Invalid Token')
  }
  if (moment(payload.expiry).format() > moment().utc().format()) {
    return done(null, payload._id)
  }
  
  return done(null, null, 'Token Expired')
}
