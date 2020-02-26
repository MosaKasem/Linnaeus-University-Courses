let mongoose = require('mongoose')

let webhookSchema = new mongoose.Schema({
  payload: {type: String, required: true, match: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/, unique: true},
  created: {type: Date, default: Date.now}
})

let WebHook = mongoose.model('webhook', webhookSchema)

module.exports = WebHook
