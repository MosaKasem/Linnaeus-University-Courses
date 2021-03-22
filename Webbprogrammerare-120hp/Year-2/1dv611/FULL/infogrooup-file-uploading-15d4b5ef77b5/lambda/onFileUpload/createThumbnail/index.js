/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 */

let AWS = require('aws-sdk')
let gm = require('gm').subClass({ imageMagick: true }) // Enable ImageMagick integration.

// get reference to S3 client
let s3 = new AWS.S3()

/**
 * @description
 * 1. Download the image from the incoming event
 * 2. Resize the downloaded image
 * 3. Upload the resized image
 */
exports.handler = function (event, context, callback) {
  const srcBucket = event.detail.requestParameters.bucketName
  const srcKey = event.detail.requestParameters.key

  const fileType = srcKey.match(/\.([^.]*)$/)[1]
  const thumbnailName = renaming(srcKey)

  downloadImage(srcKey, srcBucket)
    .then((image) => transform(image, fileType))
    .then((transformedImage) => uploadToS3(transformedImage, thumbnailName, srcBucket, fileType))
    .then(() => {
      event.detail.requestParameters.thumbnail = thumbnailName
      callback(null, event)
    })
    .catch((e) => {
      ErrorEncountered.prototype = new Error()
      const customError = new ErrorEncountered('Error encountered :' + e.message)
      event.error = e
      callback(customError, event)
    })
}

/**
 *
 * @param {*} srcKey File from the incoming event
 * @param {*} srcBucket Bucket from the incoming event.
 */
const downloadImage = function (srcKey, srcBucket) {
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
 * @param {*} image The image and it's properties.
 * @param {*} imageType The imagetype, png, jpg or gif
 * resizing image, with aspect ratio intact.
 */
const transform = function (image, imageType) {
  return new Promise(function (resolve, reject) {
    gm(image.Body).size(function (err, size) {
      if (err) return reject(err)
      var scaling = Math.min(
        200 / size.width,
        200 / size.height
      )
      var width = scaling * size.width
      var height = scaling * size.height
      this.resize(width, height, '^')
        .gravity('Center')
        .crop('200', '200')
        .toBuffer(imageType, function (err, buffer) {
          if (!err) {
            return resolve(buffer)
          } else {
            return reject(err)
          }
        })
    })
  })
}
/**
 *
 * @param {*} image image and it's properties.
 * @param {*} srcKey image filename
 * @param {*} srcBucket the destination of s3 bucket, or more specific, it's name.
 * @param {*} contentType content type of the image, jpg, gif or png
 */
const uploadToS3 = function (image, fileName, srcBucket, contentType) {
  const params = {
    Body: image,
    Bucket: srcBucket,
    Key: fileName,
    ContentType: contentType
  }
  return new Promise((resolve, reject) => {
    s3.putObject(params, function (err, data) {
      if (!err) {
        console.log('Upload to S3 success')
        resolve()
      } else {
        return reject(err)
      }
    })
  })
}

/**
 *
 * @param {*} file example ìnput : !"#¤%&/()=?.jpg
 * @summary takes in the input to produce it to the following output:
 * !"#¤%&/()=?_thumbnail.jpg
 * Add the keyword: _thumbnail after filename and before extention type.
 */
const renaming = function (file) {
  try {
    const imageType = file.match(/\.([^.]*)$/)[0]
    const fileName = file.substring(0, file.length - 4)
    if (!fileName || !imageType) throw new Error('Invalid file name or image type')
    else return fileName + '_thumbnail' + imageType
  } catch (error) {
    throw error
  }
}

function ErrorEncountered (message) {
  this.name = 'ThumbnailError'
  this.message = message
}
