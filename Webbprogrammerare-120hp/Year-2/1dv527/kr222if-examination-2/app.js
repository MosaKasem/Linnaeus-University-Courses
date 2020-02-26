/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 */

require('dotenv').config()
let express = require('express')

let bodyParser = require('body-parser')
let morgan = require('morgan')

let db = require('./database/db')

db.run().catch((err) => {
  console.log(err)
})

let app = express()
let port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('combined'))

app.use('/api/v1/', require('./routes/homepage'))
app.use('/api/v1/', require('./routes/user'))
app.use('/api/v1/', require('./routes/catch'))
app.listen(port, () => { console.log('Port: ' + port + ' is open') })

// Fixed on server side // wouldn't work for postman on server side.
/* https.createServer({
  key: fs.readFileSync('./config/key.pem'),
  cert: fs.readFileSync('./config/cert.pem')
}, app).listen(port, () => {
  console.log('Connected to ' + port)
}) */
