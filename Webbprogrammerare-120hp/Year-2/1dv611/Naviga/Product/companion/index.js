const express = require('express')
const companion = require('@uppy/companion')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(session({
  secret: '23132sadsa2131esad',
  resave: true,
  saveUninitialized: true
}))
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

// initialize uppy
const uppyOptions = {
  providerOptions: {
    google: {
      key: '267744453899-06ulldkgide980arfb2ufn3uaqnk8bdb.apps.googleusercontent.com',
      secret: 'u_WQYGYjEPt9lsF1b_3osVEo'
    },
    instagram: {
      key: 'your instagram key',
      secret: 'your instagram secret'
    }
  // you can also add options for dropbox here
  },
  server: {
    host: 'aqueous-hamlet-44959.herokuapp.com',
    protocol: 'https'
  },
  filePath: process.env.COMPANION_DATADIR,
  secret: process.env.COMPANION_SECRET,
  debug: true
}

app.use(companion.app(uppyOptions))

// Routes
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send('Welcome to Companion')
})

// handle 404
app.use((req, res, next) => {
  return res.status(404).json({ message: 'Not Found' })
})

// handle server errors
app.use((err, req, res, next) => {
  console.error('\x1b[31m', err.stack, '\x1b[0m')
  res.status(err.status || 500).json({ message: err.message, error: err })
})

companion.socket(app.listen(process.env.PORT || 3020), uppyOptions)

// console.log('Welcome to Companion!')
// console.log(`Listening on http://0.0.0.0:${3020}`)
