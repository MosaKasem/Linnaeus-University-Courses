const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const htSchema = new mongoose.Schema({
    temp: {
      type: Number,
      required: true
  },
  humidity: {
      type: Number,
      required: true
  },
  sensor: String,
  date: {
      type: Date, 
      default: Date.now()
  }
});

const HT11 = mongoose.model('hum_temp_information', htSchema);

module.exports = HT11;
