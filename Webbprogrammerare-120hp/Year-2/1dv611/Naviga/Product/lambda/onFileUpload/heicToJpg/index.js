/**
 * @author Mosa Kasem Rasol, Emil Larsson
 * @version 1.0.1
 * @description This method is for converting apple's heic&heif file type to jpg.
 */
let AWS = require('aws-sdk')

let s3 = new AWS.S3()
const fs = require('fs')
const exec = require('child_process').exec

// Environment variable for imagemagick
process.env['LD_LIBRARY_PATH'] = './lib:/lib'

exports.handler = (event, context, callback) => {
  console.log(process.env['PATH'])
  console.log(process.env['LD_LIBRARY_PATH'])

  const bucket = event.detail.requestParameters.bucketName
  let filename = event.detail.requestParameters.key

  downloadImage(filename, bucket)
    .then(data => {
      // Removing `upload/` from filename
      filename = filename.substring(7, filename.length)
      storeFileToLambda(data, filename)
    })
    .then(() => convert(filename))
    .then(() => uploadFile(filename, bucket))
    .then(() => Promise.all([deleteOldFileFromBucket(filename, bucket), cleanTmp(filename)]))
    .then(() => {
      event.detail.requestParameters.key = filename + '.jpg'
      event.ext = '.jpg'
      callback(null, event)
    }).catch(e => {
      ErrorEncountered.prototype = new Error()
      const customError = new ErrorEncountered(e.message)
      event.error = e
      callback(customError, event)
    })
}

/**
 * @param {*} filename the name of the file that was uploaded
 * @param {*} bucket the name of the s3 bucket
 */
const deleteOldFileFromBucket = (filename, bucket) =>
  s3.deleteObject({
    Bucket: bucket,
    Key: 'upload/' + filename
  }).promise()

/**
 * @param {*} filename the name of the file
 * @description clean up file that was stored under /tmp
 */
function cleanTmp (filename) {
  return new Promise((resolve, reject) => {
    exec(`rm /tmp/${filename} /tmp/${filename}.jpg`, (err, stdout) => {
      if (err) reject(err)
      resolve()
    })
  })
}

/**
 * @param {*} data the binary data
 * @param {*} filename the name of the file
 * @description store the file under /tmp folder.
 */
const storeFileToLambda = (data, filename) =>
  new Promise((resolve, reject) =>
    fs.writeFile(`/tmp/${filename}`, data.Body, err => {
      if (err) return reject(err)
      return resolve()
    }))

/**
 * @param {*} filename
 * @description run the magick package, read the file from /tmp and produce the output (conversion) to filename.heic.jpg
 */
const convert = filename =>
  new Promise((resolve, reject) => {
    exec(`./bin/magick /tmp/${filename} /tmp/${filename}.jpg`, (err, stdout) => {
      if (err) reject(err)
      resolve()
    })
  })

/**
 * @param {*} srcKey the file name
 * @param {*} srcBucket the s3 bucket
 * @returns the file from s3
 */
const downloadImage = (srcKey, srcBucket) => {
  const params = {
    Bucket: srcBucket,
    Key: srcKey
  }

  return new Promise((resolve, reject) => {
    s3.getObject(params, function (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

/**
 *
 * @param {*} filename the source file
 * @param {*} bucketName the s3 bucket name
 */
const uploadFile = (filename, bucketName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`/tmp/${filename}.jpg`, (err, data) => {
      if (err) return reject(err)
      const objParams = {
        Body: Buffer.from(data, 'binary'),
        Bucket: bucketName,
        Key: `${filename}.jpg`,
        ContentType: 'JPG'
      }
      return s3.putObject(objParams).promise().then(() => resolve())
    })
  })
}

function ErrorEncountered (message) {
  this.name = 'ThumbnailError'
  this.message = message
}
