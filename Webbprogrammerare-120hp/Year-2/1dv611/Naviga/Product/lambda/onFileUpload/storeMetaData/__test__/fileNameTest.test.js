const fileName = require('../index')

test('test if it get right file name(pig.gif)', done => {
  const file = 'pig.gif'
  const respons = fileName.removeLastFourCharsInString(file)

  expect(respons).toBe('pig')
  done()
})

test('test if can get right file name(File.png)', done => {
  const file = 'File.png'
  const respons = fileName.removeLastFourCharsInString(file)

  expect(respons).toBe('File')
  done()
})
