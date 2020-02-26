
let mongoose = require('mongoose')

require('dotenv').config()

const connection = `mongodb://${process.env.USER_NAME}:${process.env.PASS_WORD}${process.env.DATA_URLV}/${process.env.DATA_BASE}`
// const connection = `mongodb://${process.env.USER_NAME}:${process.env.PASS_WORD}@ds125318.mlab.com:25318/moses`

module.exports.run = async () => {
  mongoose.Promise = global.Promise
  mongoose.connection.on('connected', () => console.log('Connected To DB'))
  mongoose.connection.on('error', err => console.error(`Connection Failed: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Disconnected From DB.'))
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect(connection)
  // , {auth: {authdb: 'admin'}}
}
