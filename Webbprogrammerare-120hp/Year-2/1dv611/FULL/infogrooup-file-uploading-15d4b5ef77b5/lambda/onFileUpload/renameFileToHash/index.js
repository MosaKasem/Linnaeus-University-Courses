'use strict'

const aws = require('aws-sdk')
const crypto = require('crypto')

const s3 = new aws.S3()

/**
 * handler
 * Renaming files to calculated hash
 * Throw Error
 *
 * @param event
 * @param context
 * @param callback
 */
const handler = (event, context, callback) => {
  console.log('renameFileToHash')

  let newFilename
  const filename = event.detail.requestParameters.key
  const bucket = event.detail.requestParameters.bucketName

  console.log(filename)

  const params = {
    Bucket: bucket,
    Key: filename
  }

  s3.getObject(params).promise()
    .then(data => {
      let fileEnding = event.ext

      if (event.ext === undefined) {
        fileEnding = '.jpg'
      }

      newFilename = hashAndReturnNewFilename(data.Body) + fileEnding

      return doesFileExists(bucket, newFilename)
    })
    .then(msg => {
      if (msg === 'duplicate') {
        event.msg = 'duplicate'
        callback(null, event)
      } else {
        return copyFile(bucket, newFilename, filename)
      }
    })
    .then(() => deleteFile(bucket, filename))
    .then(() => {
      event.detail.requestParameters.key = newFilename
      callback(null, event)
    }).catch(e => {
      // TODO: More errorhandling for more type of events
      ImageAlreadyExists.prototype = new Error()
      const error = new ImageAlreadyExists('Image already exists')
      event.error = e
      callback(error, event)
    })
}

/**
 * hashAndReturnNewFilename
 *
 * @param {Binary} Image
 * @param {String} fileEnding
 * @returns {String} New filename
 */
const hashAndReturnNewFilename = data => {
  const hmac = crypto.createHmac('sha256', 'infomaker')

  hmac.update(data)
  return hmac.digest('hex')
}

/**
 * doesFileExists
 * Check if file exists, if file not found resolve else reject.
 *
 * @param {String} bucket
 * @param {String} newFilename
 * @returns {Promise}
 */
const doesFileExists = (bucket, newFilename) => {
  return new Promise((resolve, reject) =>
    s3.getObject({ Bucket: bucket, Key: newFilename, Range: 'bytes=0-1' },
      (err, data) => {
        if (err) {
          return resolve('File does not exist')
        } else {
          return resolve('duplicate')
        }
      }))
}

/**
 * copyFile
 *
 * @param {String} bucket
 * @param {String} newFilename
 * @param {String} filename
 * @returns {Promise}
 */
const copyFile = (bucket, newFilename, filename) => {
  // This step is needed for åäö in uploaded filenames
  const source = `/${bucket}/${encodeURIComponent(filename)}`
  return new Promise((resolve, reject) => {
    s3.copyObject({ Bucket: bucket, CopySource: source, Key: newFilename },
      (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
  })
}

/**
 * deleteFile
 *
 * @param {String} bucket
 * @param {String} filename
 * @returns {Promise}
 */
const deleteFile = (bucket, filename) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject({ Bucket: bucket, Key: filename },
      (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
  })
}

/**
 * ImageAlreadyExists
 *
 * @param {String} message
 */
function ImageAlreadyExists (message) {
  this.name = 'imageAlreadyExists'
  this.message = message
}

module.exports = {
  handler,
  hashAndReturnNewFilename,
  doesFileExists
}
