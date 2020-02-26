'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const resources = require('./routes/api/resource')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.disable('x-powered-by')


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => { console.log('- Server Port', PORT) 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => { console.log('- Database')
  })
})
mongoose.Promise = global.Promise

// Klient
app.use('/', require('./routes/home'))
app.use('/properties', require('./routes/properties'))
// API
app.get('/api', resources.resource)
app.use('/api/properties', require('./routes/api/properties_api'))