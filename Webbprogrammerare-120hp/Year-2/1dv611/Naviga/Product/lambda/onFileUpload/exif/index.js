'use strict'

const aws = require('aws-sdk')
const s3 = new aws.S3()
const exec = require('child_process').exec
const fs = require('fs')

/**
 * handler
 * Download file from bucket and save to file, run perl script to extract exif-data
 * Throw Error if not valid
 *
 * @param event
 * @param context
 * @param callback
 */
exports.handler = (event, context, callback) => {
  console.log('Reading exif data')

  const bucket = event.detail.requestParameters.bucketName
  const filename = event.detail.requestParameters.key

  // const filename = 'louise.jpg'

  const params = {
    Bucket: bucket,
    Key: filename
  }

  s3.getObject(params).promise()
    .then(data => {
      fs.writeFile(`/tmp/${filename}`, data.Body, err => {
        if (err) callback(err, event)

        exec(`perl exiftool/exiftool.pl -j /tmp/${filename}`, (error, stdout) => {
          // console.log(stdout)
          event.exif = JSON.parse(stdout)
          callback(error, event)
        })
      })
    }).catch(e => {
      console.log(e)
      callback(e, event)
    })
}
