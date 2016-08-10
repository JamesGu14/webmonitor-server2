var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var http = require('http')

const IndexRoutes = require('./routes/index')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', IndexRoutes)

var server = http.createServer(app)

var PORT = process.env.PORT || 3001

server.listen(PORT, function (err) {
  console.log('Webmonitor-server2 starts on http://localhost:', PORT)
})
