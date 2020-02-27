const index = require('../index')

test('check if we get same hash on pig.gif', done => {
  const key = 'pig.gif'

  const hashName = 'f345ed8f05ce48b42eda4f3db572c74f5616ec85cb03c2c481c8a0a6dca9d2b2'

  const getHashName = index.hashAndReturnNewFilename(key)

  expect(getHashName).toBe(hashName)
  done()
})

test('check if we get same hash on File.png', done => {
  const key = 'File.png'

  const hashName = '4d15584e805af3fd74b2ea969d3cf02c3bbfe36e23b727d4a0ae5cebb1613dad'

  const getHashName = index.hashAndReturnNewFilename(key)

  expect(getHashName).toBe(hashName)
  done()
})

test('check if we get same hash on Lake.jpeg', done => {
  const key = 'Lake.jpeg'

  const hashName = '26de1509fa3690b4858aa483e0ed7620d6961736b9c7faf6d4f756d5ae5c1d30'

  const getHashName = index.hashAndReturnNewFilename(key)

  expect(getHashName).toBe(hashName)
  done()
})

test('check if we get same hash on Stonehenge.jpg', done => {
  const key = 'Stonehenge.jpg'

  const hashName = '541f40588947cae92026da2c210af3496cd1f4f2043ecb24deeaa501c7c77d7c'

  const getHashName = index.hashAndReturnNewFilename(key)

  expect(getHashName).toBe(hashName)
  done()
})