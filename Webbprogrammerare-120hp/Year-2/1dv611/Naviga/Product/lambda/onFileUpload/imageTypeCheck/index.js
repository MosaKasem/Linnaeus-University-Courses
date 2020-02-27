'use strict'

const aws = require('aws-sdk')
const fileType = require('file-type')
const s3 = new aws.S3()

/**
 * handler
 * Get the first bytes from file and check mime type.
 * Throw Error if not valid
 *
 * @param event
 * @param context
 * @param callback
 */
const handler = (event, context, callback) => {
  console.log('Checking mimetype of file')

  const params = {
    Bucket: event.detail.requestParameters.bucketName,
    Key: event.detail.requestParameters.key,
    Range: 'bytes=0-24'
  }

  Promise.all([checkImgSize(event), s3.getObject(params).promise()])
    .then(data => {
      const type = fileType(data[1].Body)

      if (data[0] === 'too large') {
        event.msg = 'too large'
        callback(null, event)
      } else if (validMime(type)) {
        // Adding extension to event
        event.msg = 'File was successfully uploaded'
        event.ext = '.' + type.ext
        callback(null, event)
      } else {
        event.msg = 'Invalid filetype'
        callback(null, event)
      }
    })
}

/**
 * validMime
 * Check string if valid mime
 *
 * @param {String} mime
 * @returns {Boolean}
 */
const validMime = mime => {
  if (mime === undefined) {
    return false
  }

  mime = mime.mime

  switch (mime) {
    case 'image/heic':
      return true
    case 'image/heif':
      return true
    case 'image/png':
      return true
    case 'image/jpeg':
      return true
    case 'image/gif':
      return true
    default:
      return false
  }
}

const checkImgSize = (event) =>
  s3.headObject({
    Bucket: event.detail.requestParameters.bucketName,
    Key: event.detail.requestParameters.key
  }).promise()
    .then(data => data.ContentLength < 14590000 ? 'Image size is correct' : 'too large')

module.exports = {
  handler,
  validMime,
  checkImgSize
}
