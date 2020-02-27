'use strict'

const imageCheck = require('../index')
const fileType = require('file-type')
const readChunk = require('read-chunk')

test('test if it can handel png file', (done) => {
  const img = './__tests__/img/File.png'

  const buffer = readChunk.sync(img, 0, fileType.minimumBytes)

  const type = fileType(buffer)

  const respons = imageCheck.validMime(type)

  expect(respons).toBe(true)
  done()
})

test('test if it can handel gif file', (done) => {
  const img = './__tests__/img/pig.gif'

  const buffer = readChunk.sync(img, 0, fileType.minimumBytes)

  const type = fileType(buffer)
  const respons = imageCheck.validMime(type)

  expect(respons).toBe(true)
  done()
})

test('test if it can handel jpg file', (done) => {
  const img = './__tests__/img/Stonehenge.jpg'

  const buffer = readChunk.sync(img, 0, fileType.minimumBytes)

  const type = fileType(buffer)

  const respons = imageCheck.validMime(type)

  expect(respons).toBe(true)
  done()
})

test('test if it can handel jpeg file', (done) => {
  const img = './__tests__/img/Lake.jpeg'

  const buffer = readChunk.sync(img, 0, fileType.minimumBytes)

  const type = fileType(buffer)

  const respons = imageCheck.validMime(type)

  expect(respons).toBe(true)
  done()
})

test('test if it return false on wrong file type(txt)', (done) => {
  
  const img = './__tests__/wrongFiles/text.txt'

  const buffer = readChunk.sync(img, 0, 9)
  
  const type = fileType(buffer)

  let respons

  if(type === undefined)
  {
    respons = false
  } else {
   respons = imageCheck.validMime(type)
  }
  expect(respons).toBe(false)
  done()
})

test ('test if it return false on wrong file(json)', (done) => {
  const img = './__tests__/wrongFiles/jsonTest.json'

  const buffer = readChunk.sync(img, 0, fileType.minimumBytes)
  
  const type = fileType(buffer)

  let respons

  if(type === undefined)
  {
    respons = false
  } else {
   respons = imageCheck.validMime(type)
  }
  expect(respons).toBe(false)
  done()
})