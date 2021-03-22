const imageCheck = require('../index')

test('test with File.png from s3 bucket', done => {
  const event = {
	  detail:{
			requestParameters:{
				bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
				key:'File.png' //change to your file in s3 bucket
			}
		}
  }

  const fileTypeOfFile = '.png'

  const callback = (toNull, data) => {
    const ext = data.ext

    expect(ext).toBe(fileTypeOfFile)
    done()
  }

  imageCheck.handler(event, 'context', callback)

})

test('testing with lake+.jpeg', done => {
    
    const event = {
        detail:{
              requestParameters:{
                  bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
                  key:'lake+.jpeg' //change to your file in s3 bucket
              }
          }
    }
  
    const fileTypeOfFile = '.jpg'
  
    const callback = (toNull, data) => {
  
      const ext = data.ext
  
      expect(ext).toBe(fileTypeOfFile)
      done()
    }
  
    imageCheck.handler(event, 'context', callback)
})

test('testing with pig.gif', done => {
    const event = {
        detail:{
              requestParameters:{
                  bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
                  key:'pig.gif' //change to your file in s3 bucket
              }
          }
    }
  
    const fileTypeOfFile = '.gif'
  
    const callback = (toNull, data) => {
  
      const ext = data.ext
  
      expect(ext).toBe(fileTypeOfFile)
      done()
    }
  
    imageCheck.handler(event, 'context', callback)
})

test('see what happen when file is not image', done => {
  const event = {
    detail:{
      requestParameters:{
        bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
        key:'books.txt' //change to your file in s3 bucket
      }
    }
  }

  const callback = (toNull, data) => {
    expect(data.msg).toBe('Invalid filetype')
    done()
  }

  imageCheck.handler(event, 'context', callback)
})

test('file size to big', done => {
  const event = {
    detail:{
      requestParameters:{
        bucketName:'sdlfkjsdlkfjsdfzaerrasdf', //change to your bucket to test
        key: '1.jpg' //change to your file in s3 bucket
      }
    }
  }

  const callback = (toNull, data) => {
    expect(data.msg).toBe('too large')
    done()
  }

  imageCheck.handler(event, 'context', callback)
})
