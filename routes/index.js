const express = require('express')
const util = require('util')
const router = express()
const Auth = require('../code/authentication')

router.get('/', function (req, res) {
  res.send('Webmonitor2 Server')
})

router.post('/login', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  Auth.login(req.body.username, req.body.password, function (err, result, token, profile) {
    if (err) {
      return res.json({ error: err.message })
    }
    if (!result) {
      return res.json({ error: null, success: false })
    }

    return res.json({ success: true, token: token, profile: profile })
  })
})

router.get('/checkonline', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
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
