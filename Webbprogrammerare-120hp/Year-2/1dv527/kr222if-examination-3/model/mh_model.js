const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const MHSchema = new mongoose.Schema({
  moisture: {
      type: String,
      required: true
    },
  percentage: {
      type: String,
      required: true
    },
  date: {
      type: Date,
      default: Date.now()
    }
})

const MH = mongoose.model('moisture_information', MHSchema)

module.exports = MH
