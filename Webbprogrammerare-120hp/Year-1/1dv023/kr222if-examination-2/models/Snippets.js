/**
 * @author Mosa Kasem Rasol
 * @version 1.1.1
 * @description MongooseSchema for creating Snippet - store author/date/etc
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snippetSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: String
  },
  updatedAt: {
    type: String
  }
})

const Snippets = mongoose.model('snippets', snippetSchema)

module.exports = Snippets
