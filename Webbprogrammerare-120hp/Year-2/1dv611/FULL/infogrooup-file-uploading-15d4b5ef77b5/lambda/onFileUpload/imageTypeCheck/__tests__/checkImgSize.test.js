const index = require('../index')

test('test if we get image size is correct', done => {
	const event = {
		detail: {
			requestParameters: {
				bucketName: 'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
				key: 'File.png' //change to your file in s3 bucket
			}
		}
	}
	index.checkImgSize(event)
		.then(data => {
			expect(data).toBe('Image size is correct')
			done()
		})
})

test('test if we get image size is to big', done => {
	const event = {
		detail: {
			requestParameters: {
				bucketName: 'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
				key: '1.jpg' //change to your file in s3 bucket
			}
		}
	}
	index.checkImgSize(event)
		.then(msg => {
			expect(msg).toBe('too large')
			done()
		})

})