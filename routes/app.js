const express = require('express')
const router = express()
const Auth = require('../code/authentication')
const Boom = require('boom')

var User_app = require('../models/').User_app

/**
 * GET /
 * get a list of applications that is monitored of the current user
 */
router.get('/', function (req, res) {
  // User_app.find({
  //   'userid': 
  // })
  Auth.isOnline(req.get('authorization'), function (err, _id, msg) {
    
    if (err || !_id) {
      return res.status(401).send('Unauthorized')
    }

    User_app.find({ userid: _id }, function (err, result) {
      
      if (err) {
        return res.status(503).send('Service temporarily unavailable')
      }

      return res.json(result)
    })
  })
})

module.exports = router
