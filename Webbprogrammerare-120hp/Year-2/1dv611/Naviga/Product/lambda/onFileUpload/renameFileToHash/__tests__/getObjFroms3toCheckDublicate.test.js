const index = require('../index')

test('check if file has no dublicate', done => {
  const event = {
    detail:{
      requestParameters:{
        bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
        key:'Lake.jpeg' //change to your file in s3 bucket
      }
    }
  }

  index.doesFileExists(event.detail.requestParameters.bucketName, event.detail.requestParameters.key)
    .then(result => {
      expect(result).toBe('File does not exist')
      done()
    })
})

test('check if file is a dublicate', done => {
  const event = {
    detail:{
      requestParameters:{
        bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
        key:'File.png' //change to your file in s3 bucket
      }
    }
  }
  
  expect.assertions(1)

  return index.doesFileExists(event.detail.requestParameters.bucketName,event.detail.requestParameters.key).catch(e => {
    expect(e).toEqual(null)
    done()
  })
})
