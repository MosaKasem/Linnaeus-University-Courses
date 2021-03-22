'use strict'

const mongoClient = require('mongodb').MongoClient
const MONGODB_URI = process.env.MONGODB_URI
const DATABASE = process.env.DATABASE
const COLLECTION = process.env.COLLECTION

let cachedDb = null

module.exports.status = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const body = JSON.parse(event.body)
    const ip = event['requestContext']['identity']['sourceIp']
    const filename = body.filename

    console.log(ip)
    console.log(filename)

    connectToDatabase(MONGODB_URI)
      .then(dbo => checkStatusOnFile(dbo.db(DATABASE), ip, filename))
      .then(result => isThereMessage(result))
      .then(msg => {
        console.log(msg)

        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ msg })
        })
      }).catch(e => new Error(e))
  } catch (e) {
    callback(e, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ e })
    })
  }
}

/**
 * isThereMessage
 * if there is a message returns it else return No message
 *
 * @param {Object} result
 * @returns {String}
 */
const isThereMessage = result => {
  if (result.length === 0) {
    return 'No message'
  }

  return result.msg
}

/**
 * Check if there is anything in the database
 * Change seen to true if message found
 *
 * @param db - Database connection
 * @param ip - Ip to search for
 * @param filename - filename
 * @returns {Promise}
 */
const checkStatusOnFile = (db, ip, filename) =>
  new Promise((resolve, reject) => {
    db.collection(COLLECTION)
      .find({ ip: ip, filename: filename, seen: false })
      .toArray((err, items) => {
        console.log(items)
        if (err) return reject(err)
        if (items.length === 0) return resolve(items)
        db.collection(COLLECTION).updateOne(
          { '_id': items[0]._id },
          { $set: { seen: true } },
          { upsert: true }, (err, result) => {
            if (err) reject(err)
            resolve(items[0])
          })
      })
  })

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
