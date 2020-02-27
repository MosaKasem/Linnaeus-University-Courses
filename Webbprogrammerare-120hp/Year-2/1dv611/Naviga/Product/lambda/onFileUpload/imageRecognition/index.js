'use strict'

const aws = require('aws-sdk')
const rekognition = new aws.Rekognition()

const handler = (event, context, callback) => {
  const params = {
    Image: {
      S3Object: {
        Bucket: event.detail.requestParameters.bucketName,
        Name: event.detail.requestParameters.key
      }
    },
    MaxLabels: 10,
    MinConfidence: 50
  }
  if (event.ext === '.gif') {
    event.imageRec = 'No Data'
    callback(null, event)
  } else {
    rekognition.detectLabels(params, (err, data) => {
      if (err) {
        console.log(err)
        callback(err, event)
      }
      event.imgRec = data.Labels

      console.log('Analysis labels:', data.Labels)
      console.log(event.imgRec)

      callback(null, event)
    })
  }
}
module.exports = {
  handler
}
