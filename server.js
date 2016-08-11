var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var http = require('http')

const IndexRoutes = require('./routes/index')
const AppRoutes = require('./routes/app')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// Cross domain call with Authorization Header
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  
  next()
})
app.use('/', IndexRoutes)
app.use('/app', AppRoutes)

var server = http.createServer(app)

var PORT = process.env.PORT || 3001

server.listen(PORT, function (err) {
  console.log('Webmonitor-server2 starts on http://localhost:', PORT)
})


