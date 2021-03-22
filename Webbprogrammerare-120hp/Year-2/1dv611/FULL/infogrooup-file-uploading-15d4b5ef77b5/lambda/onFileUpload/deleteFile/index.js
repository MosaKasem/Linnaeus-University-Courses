'use strict'

const aws = require('aws-sdk')
const s3 = new aws.S3()

/**
 * deleteFile
 * Delete an invalid file, if file not found resolve else reject.
 *
 * @param {String} bucket
 * @param {String} newFilename
 * @returns {Promise}
 */
exports.handler = (event, context, callback) => {
  const filename = event.detail.requestParameters.key
  const bucket = event.detail.requestParameters.bucketName

  s3.deleteObject({ Bucket: bucket, Key: filename },
    (err, data) => {
      console.log(data)
      err ? callback(err) : callback(null, event)
    })
}
