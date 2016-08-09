var express = require('express')
var util = require('util')
var router = express()
var passport = require('../code/authentication')

router.get('/', function (req, res) {
  res.send('Webmonitor2 Server')
})

module.exports = router
