const express = require('express')
const router = express()
const Auth = require('../code/authentication')
const Boom = require('boom')

const Models = require('../models/')
var User_app = Models.User_app
var Contact = Models.Contact


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

router.post('/contact', function (req, res) {
  Auth.isOnline(req.get('authorization'), function (err, _id, msg) {
    if (err || !_id) {
      return res.status(401).send('Unauthorized')
    }

    let payload = req.body
    let _contact = new Contact({
      username: payload.username,
      reason: payload.reason,
      mobile: payload.mobile,
      content: payload.content,
      submit_at: new Date()
    })
    _content.save(function (error) {
      if (error) {
        return res.status(503).send('Service temporarily unavailable')
      }

      return res.json({ success: true })
    })
  })
})

module.exports = router
