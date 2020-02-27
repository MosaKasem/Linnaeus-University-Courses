'use strict'

const aws = require('aws-sdk')
const s3 = new aws.S3({ region: 'eu-west-1'})

/**
 * async
 * Generate presigned URI and returns it
 *
 * @param event
 * @param context
 * @returns {undefined}
 */
module.exports.getUploadUri = (event, context, callback) => {
  try {
    const body = JSON.parse(event.body)
    const params = {
      Bucket: process.env.BUCKET,
      Expires: 10000000, // time to expire in seconds

      Fields: {
        key: 'upload/' + body.filename
      },
      conditions: [
        { acl: 'private' },
        { success_action_status: '201' },
        ['starts-with', '$key', ''],
        ['content-length-range', 0, 100000],
        { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' }
      ]
    }

    s3.createPresignedPost(params, (err, data) => {
      if (err) throw new Error(err)

      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    })
  } catch (e) {
    callback(e, {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: {
        'msg': 'Unprocessable Entity'
      }
    })
  }
}

/**
 * async
 * To test the api
 *
 * @returns {undefined}
 */
module.exports.ping = async () => {
  return {
    ping: 'pong'
  }
}

