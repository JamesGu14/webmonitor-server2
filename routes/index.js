const express = require('express')
const util = require('util')
const router = express()
const Auth = require('../code/authentication')

router.get('/', function (req, res) {
  res.send('Webmonitor2 Server')
})

router.get('/login', function (req, res) {
  Auth.login('admin@admin.com', '123', function (err, result, token, message) {
    if (err) {
      return res.send(err.message)
    }
    if (!result) {
      return res.send('Login failed')
    }
    return res.send(token)
  })
})

router.get('/checkonline', function (req, res) {
  
  Auth.isOnline(req.query.token, function (err, success, message) {
    if (err) {
      return res.send(err.message)
    } else if (!success) {
      return res.send(message)
    }

    return res.send('Welcome back')
  })
})

module.exports = router
