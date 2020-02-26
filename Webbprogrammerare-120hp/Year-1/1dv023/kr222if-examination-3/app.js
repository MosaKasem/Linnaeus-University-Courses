/**
 * @author Mosa Kasem Rasol
 * @version 1.0.2
*/

let express = require('express')
let exphbs = require('express-handlebars')
let bodyParser = require('body-parser')
let path = require('path')
let socket = require('socket.io') // for the websocket.

let app = express()
let port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// handlebars so it's dynamic!
app.engine('.handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.handlebars'
}))
app.set('view engine', '.handlebars')

app.use('/', require('./routes/github'))
app.use(express.static(path.join(__dirname, 'public')))
// listen on port || 3000
let server = app.listen(port, () => {
  console.log(`Hello port ${port}.`)
})

let io = socket(server)

io.on('connection', function (socket) {
  console.log(`Websocket connection established`)
})

// github-webhook-middleware middleware to authenticate if user is
let githubmiddleware = require('github-webhook-middleware')({
  secret: process.env.TOKEN
})
let crypto = require('crypto')
// let secureCompare = require('secure-compare') // this was very unstable, sometimes it worked, but most of the time it didnt, i console logged and they were identical.

/**
 * @event (github) github sends a request for me, and i get to adjusting how it's delivered!
 * @description githubmiddleware - authentication, letting github know that it is me.
 */
app.post('/issues', githubmiddleware, function (req, res) {
  let payload = JSON.stringify(req.body)
  let signature = req.headers['x-hub-signature']
  let hashning = crypto.createHmac('sha1', 'hej')
  hashning.update(payload)
  let secretHash = 'sha1=' + hashning.digest('hex')
  if (signature === secretHash) {
    let notification = {
      action: req.body.action,
      title: req.body.issue.title,
      user: req.body.issue.user.login
    }
    let context = {
      id: req.body.issue.id,
      user: req.body.issue.user.login,
      title: req.body.issue.title,
      issueBody: req.body.issue.body,
      comments: req.body.issue.comments,
      issueUrl: req.body.issue.url,
      created_at: req.body.issue.created_at,
      updated_at: req.body.issue.updated_at
    }
    if (req.headers['x-github-event'] === 'issues') {
      io.emit('issue webhook', notification)
      io.emit('issue body', context)
    } else if (req.headers['x-github-event'] === 'issue_comment') {
      io.emit('issue comment', notification)
      io.emit('issue body', context)
    }
    res.status(200)
    res.send()
  } else {
    res.status(404)
    res.send(`you're not from github`)
  }
})

/**
 * @description For nginx config https fix
 * server {
 * listen 80 default_server;
 * listen [::]:80 default_server;
 * server_name localhost;
 * _tokens off,
 * return 301 https://$host$request_uri
 * }
 */
// nånting nämndes om att använda production localt på peer instructions, varför visade inte han det?
// I used self-signed certificate.
