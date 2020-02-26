/** @deprecated(Mongoose Schema) */
let mongoose = require('mongoose')

// defining a schema.
let scheduleSchema = mongoose.Schema({
  user: {type: String, unique: true, required: true},
  time: {type: Number, unique: true},
  createdAt: {type: Date, default: Date.now},
  boolean: {admin: false}
})

let Schedule = mongoose.model('booked', scheduleSchema)

module.exports = Schedule
