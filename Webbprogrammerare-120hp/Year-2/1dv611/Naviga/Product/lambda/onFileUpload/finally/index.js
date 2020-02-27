'use strict'

const mongoClient = require('mongodb').MongoClient
const MONGODB_URI = process.env.MONGODB_URI
const DATABASE = process.env.DATABASE
const COLLECTION = process.env.COLLECTION

let cachedDb = null

/**
 * handler
 * Store new object in database
 *
 * @param event
 * @param context
 * @param callback
 */
const handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('Store in database file event')

  let ip
  let filename

  // If it is an array it comes from the parallel process
  if (Array.isArray(event)) {
    ip = event[0].detail.sourceIPAddress
    filename = event[0].detail.resources[0].ARN
  } else {
    ip = event.detail.sourceIPAddress
    filename = event.detail.resources[0].ARN
  }

  filename = filename.substring(filename.lastIndexOf('/') + 1, filename.length)
  let msg = event.msg || 'The file was successfully uploaded and processed.'

  if (msg === 'duplicate') {
    msg = '(Duplicate) The file was already in the system'
  }

  const item = {
    date: Date.now(),
    ip: ip,
    filename: filename,
    msg: msg,
    seen: false
  }

  connectToDatabase(MONGODB_URI)
    .then(dbo => addItem(dbo.db(DATABASE), item))
    .then(() => callback(null, event))
    .catch(e => callback(e))
}

/**
 * addItem
 * Add the new item to database
 *
 * @param db - Database connection
 * @param item - Object containing the data
 * @returns {Promise}
 */
const addItem = (db, item) =>
  new Promise((resolve, reject) =>
    db.collection(COLLECTION).insertOne(item, () => resolve()))

/**
 * connectToDatabase
 * If already connected reuse the old one
 *
 * @param uri
 * @returns {Promise}
 */
const connectToDatabase = uri => {
  console.log('connect to database')

  if (cachedDb) {
    console.log('using cached database instance')
    return Promise.resolve(cachedDb)
  }

  return mongoClient.connect(uri, { useNewUrlParser: true })
    .then(db => {
      cachedDb = db
      return cachedDb
    })
}

module.exports = {
  handler
}
