const index = require('../index')
const aws = require('aws-sdk')

const S3 = new aws.S3()

let event = [{
	"detail": {
		"requestParameters": {
			"bucketName": "sdlfkjsdlkfjsdfzaerrasdf",
			"key": "File.png"
		},
		"exif": [
			{
				"data": "någonData",
				"view": "testtest"
			}
		],
		"Tags": [
			{
				"data": "här ska det vara tags data"
			}
		]
	}
}]

test('add meta data to s3 bucket (file.png))', done => {
	
	const callback = (works, event) => {

		const params = {
			Bucket: event[0].detail.requestParameters.bucketName,
			Key: index.removeLastFourCharsInString(event[0].detail.requestParameters.key) + '.json'
		}
		S3.getObject(params).promise()
		.then(data => {
				const result = data.Body

				expect(typeof(result)).toBe('object')
  			done()
		})
	}

	index.handler(event, '', callback)
})

event[0].detail.requestParameters.key = "_DSC0213.jpg"

test('add meta data to s3 bucket (_DSC0213.jpg)', done => {
	
	const callback = (works, event) => {

		const params = {
			Bucket: event[0].detail.requestParameters.bucketName,
			Key: index.removeLastFourCharsInString(event[0].detail.requestParameters.key) + '.json'
		}
		S3.getObject(params).promise()
		.then(data => {
				const result = data.Body

				expect(typeof(result)).toBe('object')
  			done()
		})
	}

	index.handler(event, '', callback)
})