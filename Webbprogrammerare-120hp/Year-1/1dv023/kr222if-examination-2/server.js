/**
 * @author Mosa Kasem Rasol
 * @version 1.1.1
 * @description  Added Helmet against SSH attacks //even tho mongoose handles it beautifully, and csurf against CSRF attacks
*/
let mongoose = require('mongoose')
let express = require('express')
let bodyParser = require('body-parser')
let exphbs = require('express-handlebars')
let path = require('path')
let expressValidator = require('express-validator')
let expressSession = require('express-session')
let fs = require('fs')
let https = require('https')
let helmet = require('helmet')
let port = process.env.PORT || 4000

let app = express()
let db = mongoose.connection
// app.use(function (req, res) {
//   req.csrfToken()
// })
app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com', 'cdnjs.com']
  }
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())
const sessionOptions = {
  name: 'footofatook gandalf',
  secret: 'foolofatook',
  saveUninitialized: false, // same as resave, if set to true, session will be stored on sever even if it might not have been intialized
  resave: false, // if true: session will be saved on server, on each request, no matter if something changed or not.
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.handlebars',
  partialsDir: __dirname + '/views/flash' // had to use __dirname or else, error message couldn't load partial. // if teacher could get help me get this to work with path.resolve or path.join i'd really appreciate it.
}))
app.set('view engine', 'handlebars')

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // first proxy trusted, but what happens with next one? only good for production?
  sessionOptions.cookie.secure = true
}
// use our settings/cookie
app.use(expressSession(sessionOptions))

app.use(function (req, res, next) {
  if (req.session.user) {
    // control header, no caching.
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  }
  next()
})

app.use((req, res, next) => {
  // if (req.session.flash !== undefined) {
  res.locals.flash = req.session.flash
  delete req.session.flash
  // }
  console.log(req.session.flash)
  next()
})
// when uer logs out, this is executed.
app.use('/logout', function (req, res) {
  req.session.destroy(function () {
    res.redirect('/')
  })
})
// something I wanted to try or implement. but didn't get quite around to finish, due to time constraint, can be found here:
// http://www.codexpedia.com/node-js/a-very-basic-session-auth-in-node-js-with-express-js/
let auth = function (req, res, next) {
  if (req.session && req.session.user === 'amy' && req.session.admin) {
    return next()
  } else {
    return res.sendStatus(401)
  }
}
app.get('/content', auth, function (req, res) {
  res.send("You can only see this after you've logged in.")
})

app.use('/', require('./routes/allmyroutes'))

// Listen for events
db.on('error', function () {
  console.log('We got a connection error!')
})

// When connected
db.once('open', function () {
  console.log('Succesfully connected to mongoDB')
})

// connection URL should be in /config
mongoose.connect('mongodb://Scorpionish:fuctzn3wb@ds125318.mlab.com:25318/moses', err => {
  if (err) {
    console.log(`there's an error at 01: ${err.stack}`)
  } // else { // use this if you don't want https.
    // app.listen(port, function () {
    //   console.log('Express started on http://localhost:' + port)
    //   console.log('Press Ctrl-C to terminate...')
    // })
})

/**
 * @see (https) - create a https server.
 * correct me if am wrong, in session cookie, http only tells the browser that if a javascript attempts to access cookie, the browser should not return a value.
 * good against cross site scripting? yes : no
 * stops reading and writing of cookies, to protect client/user
*/
https.createServer({

  key: fs.readFileSync('./config/sslcerts/key.pem'),

  cert: fs.readFileSync('./config/sslcerts/cert.pem')

}, app).listen(port, () => console.log(`To enter: ${port} \nType: https://localhost:4000 in the browser`))
