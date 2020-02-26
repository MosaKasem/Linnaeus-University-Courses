let router = require('express').Router()
let csurf = require('csurf')
let User = require('../models/User')
let csrfProtection = csurf()
router.use(csrfProtection)

router.route('/login')
    .get((req, res) => {
      res.render('loginPage', { csrfToken: req.csrfToken() })
    }).post(function (req, res) {
      if (req.body.username < 1 || req.body.password < 1) { // if user doesn't include a username only password or other way around.
        req.session.flash = {
          type: 'elegant-color-dark blockquote bq-danger',
          message: 'Both fields are required'
        }
        res.status(400).send()
        return res.redirect('/login')
      }
      User.findOne({'username': req.body.username}, function (err, userExists) {
        if (err) {  // if user does not exist in dbs
          req.session.flash = {
            type: 'elegant-color-dark blockquote bq-danger',
            message: 'No user exists with that username!'
          }
          res.redirect('/')
        } else if (userExists) {
          userExists.comparePassword(req.body.password, function (err, match) {
            if (err) {  // if user does not exist in dbs
              req.session.flash = {
                type: 'elegant-color blockquote bq-warning',
                message: 'Password is required!'
              }
              res.status(404).send()
            }
            if (match === false) {
              req.session.flash = {
                type: 'elegant-color blockquote bq-warning',
                message: 'Sorry, your password was incorrect. Please double-check your password.'
              }
              res.status(404).send()
              res.redirect('/login')
            }
            if (match) {
              req.session.regenerate(() => {
                req.session.flash = {
                  type: 'success-color-dark blockquote bq-success',
                  message: `Hi and welcome ${req.body.username} to the salong!`
                }
                req.session.user = req.body.username
                req.session.uniqueID = userExists._id
                res.status(200).send()
                return res.redirect('/')
              })
            }
          })
        } else {
          req.session.flash = {
            type: 'elegant-color-dark blockquote bq-danger',
            message: 'Incorrect login info'
          }
          res.redirect('#')
        }
      })
    })

module.exports = router
