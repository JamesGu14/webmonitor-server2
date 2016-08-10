var mongoose = require('mongoose')
const Config = require('../config/')
mongoose.connect(Config.get('/database/mongo/url'))

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('MongoDB Connected at: ' + Config.get('/database/mongo/url'))
})

module.exports = mongoose
