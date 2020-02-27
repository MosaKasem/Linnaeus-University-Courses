'use strict'

const exif = require('../index')

test('check if we get exif data from file', done => {
  const event = {
	  detail:{
			requestParameters:{
				bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
				key:'File.png' //change to your file in s3 bucket
			}
		}
  }
  const callback = (err, event) => {

    expect(err).toBe(null)
    done()
  }

  exif.handler(event, 'context', callback)
})

test('check if we get exif data from file obj(jpeg)', done => {
  const event = {
	  detail:{
			requestParameters:{
				bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
				key:'lake+.jpeg' //change to your file in s3 bucket
			}
		}
  }
  const callback = (err, event) => {

    const exif = event.exif
    
    expect(typeof(exif)).toBe('object')
    done()
  }

  exif.handler(event, 'context', callback)
})

test('check if we get exif data from file obj(gif)', done => {
    const event = {
        detail:{
              requestParameters:{
                  bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
                  key:'pig.gif' //change to your file in s3 bucket
              }
          }
    }
    const callback = (err, event) => {
  
      const exif = event.exif
      
      expect(typeof(exif)).toBe('object')
      done()
    }
  
    exif.handler(event, 'context', callback)
  })