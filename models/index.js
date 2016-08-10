var mongoose = require('../code/mongoose')
var Schema = mongoose.Schema

/**
 * sys_user model, dashboard users
 * registered accounts or OAuth accounts
 */
var sys_userSchema = new Schema({ 
  username: { type: String, required: true },
  password: { type: String, required: true },
  source: String,
  reg_time: Date,
  user_rating: { 
    type: Number,
    min: 0,
    max: 10
  }
})

var Sys_user = mongoose.model('sys_user', sys_userSchema)
module.exports.Sys_user = Sys_user

// Save function
module.exports.save_sys_user = function(_sys_user, next) { 
  // Think if we need to do this
  _sys_user.save(function (err) {
    if (err) {
      return next(err, null)
    }
    return next(null, _sys_user)
  })
}

/**
 * user_app model, one sys_user may have 0 - * apps
 * each app has a unique key
 */
var user_appSchema = new Schema({ 
  userid: mongoose.Schema.Types.ObjectId,
  app_name: { type: String, required: true },
  app_url: { type: String, required: true },
  api_key: { type: String, required: true },
  start_time: Date,
  end_time: Date,
  is_canceled: { 
    type: Boolean,
    default: false
  }
})

module.exports.User_app = mongoose.model('user_app', user_appSchema)

/**
 * app_log model
 * rand_uuid: generated at client side as a uniq identifier
 * device: what device the client is using
 * broswer: what browser the client is using
 * action: open / leave
 * time: action happened time
 * api_key: [Important] when client visit a page with this API, indicates wether the web belongs to the applied webmaster
 *          later on need to check whether a webmaster's api_key same with the api_key here
 *          if not equal, may be an invalid key or user.
 */

var app_visitSchema = new Schema({ 
  appid: mongoose.Schema.Types.ObjectId,
  rand_uuid: String,
  url: { type: String, required: true },
  user_ip: { type: String, required: true },
  device: String,
  broswer: String,
  action: { type: String, required: true },
  time: Date,
  api_key: { type: String, required: true }
})

module.exports.App_visit = mongoose.model('app_visit', app_visitSchema)

/**
 * contact model, user contact us form submits to here
 */
var contactSchema = new Schema({ 
  username: { type: String, required: true },
  reason: String,
  mobile: String,
  content: { type: String, required: true },
  submit_at: Date
})

module.exports.Contact = mongoose.model('contact', contactSchema)
