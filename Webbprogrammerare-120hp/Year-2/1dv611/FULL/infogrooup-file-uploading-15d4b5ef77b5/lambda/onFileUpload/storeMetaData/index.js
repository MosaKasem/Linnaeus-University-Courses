'use strict'

const aws = require('aws-sdk')
const S3 = new aws.S3()

/**
 * get exif and imgRec from event and add them in a json file to S3 bucket
 * @param {*} event event for aws
 * @param {*} context
 * @param {*} callback a callback function
 */
const handler = (event, context, callback) => {
  const bucket = event[0].detail.requestParameters.bucketName
  const filename = removeLastFourCharsInString(event[0].detail.requestParameters.key) + '.json'
  const exif = event.filter(e => e.exif)[0].exif
  const tags = event.filter(e => e.imgRec)[0].imgRec

  const params = {
    Bucket: bucket,
    Key: filename,
    Body: JSON.stringify({
      exif: exif,
      imgRec: tags
    }),
    ServerSideEncryption: 'AES256',
    ContentType: 'json'
  }

  S3.putObject(params, (err) => {
    if (err) callback(err, event)

    callback(null, event)
  })
}

/**
 * Removes the last four characters in string
 * @param {String} filename the file to get name from
 * @returns {String}
 */
const removeLastFourCharsInString = filename =>
  filename.slice(0, filename.length - 4)

module.exports = {
  handler,
  removeLastFourCharsInString
}
