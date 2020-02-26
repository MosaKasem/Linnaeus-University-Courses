/**
 * @author Mosa Kasem Rasol
 * @version 1.0.2
*/

require('dotenv').config()

let router = require('express').Router()
let bodyParser = require('body-parser')
var github = require('octonode')

let client = github.client(process.env.TOKEN) // Token from github.
// var ghissue = client.issue('/repos/1dv023/kr222if-examination-3') // alternative to * let url = ¨¨ *
let url = '/repos/1dv023/kr222if-examination-3/issues'

router.use(bodyParser.urlencoded({extended: true}))

router.route('/').get(function (req, res) {
  client.get(url, {}, function (err, method, body, headers) {
    if (err) return console.log(`An error occured: ${err.stack}`)
    let context = {
      issue: body.map(issue => {
        return {
          user: issue.user.login,
          body: issue.body,
          title: issue.title,
          created_at: issue.created_at,
          comments: issue.comments,
          updated_at: issue.updated_at
        }
      })
    }
    res.render('home/home', context)
  })
})

module.exports = router
