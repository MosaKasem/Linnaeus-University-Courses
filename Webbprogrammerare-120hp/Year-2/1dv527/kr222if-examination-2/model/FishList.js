let mongoose = require('mongoose')
let autoInc = require('mongoose-auto-increment')

let connection = mongoose.createConnection(process.env.DATA_STRING)
autoInc.initialize(connection)

let FishSchema = new mongoose.Schema({
  user: {type: String, required: true},
  position: {type: String, required: true, match: /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/},
  specie: {type: String, required: true},
  weight: {type: Number, required: true},
  imageUrl: {type: String, required: true},
  timeStamp: {type: Number, required: true, default: Date.now()}
})

// not working - made it global - still not working
/* FishSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true
  next()
}) */

FishSchema.plugin(autoInc.plugin, {model: 'Catch', field: 'catchID', startAt: 1})
module.exports = mongoose.model('Catch', FishSchema)
