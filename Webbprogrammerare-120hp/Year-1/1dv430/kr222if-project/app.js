/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 * @description This school project consist of a client.
 * The client is located in denmark, he is a hairdresser and a salon owner.
 * This API will be dedicated to the client.
 */

let express = require('express')
let exphbs = require('express-handlebars')
let expressSession = require('express-session')
let path = require('path')
let expressValidator = require('express-validator')
// let fs = require('fs')
let bodyParser = require('body-parser')
let mongoose = require('./db/db.js')
let expressSanitizer = require('express-sanitizer')

let app = express()
const port = process.env.PORT || 8080

/** @description MiddleWare Parser */
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(expressValidator())
app.use(expressSanitizer())

mongoose.run().catch(err => {
  if (err) {
    process.exit(1)
  }
})

/** @description setting session settings */
const sessionConfig = {
  name: 'unique_ID',
  secret: 'ESAMNG0525GBAY95',
  resave: false, // if not modified, don't save anything.
  saveUninitialized: false,
  cookie: {
    httpsOnly: false,
    maxAge: 1000 * 25 * 40 * 5
  }
}
/** @description setting static files */
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'hbs')

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sessionConfig.cookie.secure = true
}
/** @description Set Out Config For Session */
app.use(expressSession(sessionConfig))

/** @description setting flash message handler */
// app.use((req, res, next) => {
//   console.log(req.session.flash)
//   // if (req.session.flash) {
//   res.locals.flash = req.session.flash
//   console.log(req.session.flash)
//   delete req.session.flash
//   // }
//   next()
// })
// detta är min >

app.use(function (req, res, next) {
  res.locals.session = req.session
  // console.log(req.session)
  next()
})

app.use((req, res, next) => {
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    // Delete it the flash from the session
    delete req.session.flash
  }
  next()
})
app.use('/logout', function (req, res) {
  req.session.destroy(function () {
    res.clearCookie('unique_ID', {path: '/'}).redirect('/')
  })
})

app.use('/', require('./routes/homePage.js'))
app.use('/', require('./routes/pricesPage.js'))
app.use('/', require('./routes/schedulePage.js'))
app.use('/', require('./routes/registerPage.js'))
app.use('/', require('./routes/loginPage.js'))
app.use('/', require('./routes/picturesPage.js'))

app.use((req, res) => {
  res.status(404).render('error/404')
})

app.use((req, res) => {
  res.status(400).render('error/400')
})

app.use((req, res) => {
  res.status(403).render('error/403')
})

app.use((req, res) => {
  res.status(500).render('error/500')
})

app.use((err, req, res, next) => {
  if (err.status === 404) { return next(err) }
  res.status(404).render('error/404')
})

app.use((err, req, res, next) => {
  if (err.status === 400) { return next(err) }
  res.status(400).render('error/400')
})

app.use((err, req, res, next) => {
  if (err.status === 403) { return next(err) }
  res.status(403).render('error/403')
})

app.use((err, req, res, next) => {
  if (err.status === 500) { return next(err) }
  res.status(500).render('error/500')
})

app.use(function (err, req, res, next) {
  if (res.status === 404) {
    return next(err)
  }
  res.render('error/404')
})

app.listen(port, () => console.log('Listening on port %s!', port))
