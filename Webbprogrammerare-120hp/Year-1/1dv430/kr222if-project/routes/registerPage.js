
// const bodyParser = require('body-parser')
let User = require('../models/User')
let router = require('express').Router()
let csruf = require('csurf')
let csrfProtection = csruf()
router.use(csrfProtection)

router.route('/Register')
    .get((req, res) => {
      res.render('registerPage', {
        csrfToken: req.csrfToken()
      })
    })
    .post(function (req, res, next) {
      let username = req.body.username
      let password = req.body.password

      let user = new User({
        username: req.sanitize(username),
        password: password
      })
      let passwordWarn = 'Password must be atleast 7 characters long'
      let userWarnin = 'Username must be atleast 7 characters long'
      req.check('password', passwordWarn).isLength({min: 7, max: 20})
      req.check('username', userWarnin).isLength({min: 7, max: 20})
      let errors = req.validationErrors()
      if (errors) {
        errors.forEach(element => {
          if (element.param === 'password') {
            req.session.flash = {
              type: 'elegant-color blockquote bq-warning',
              message: passwordWarn
            }
          } else if (element.param === 'username') {
            req.session.flash = {
              type: 'elegant-color blockquote bq-warning',
              message: userWarnin
            }
          }
        })
        return res.redirect('/register')
      }
      User.findOne({'username': username}, function (err, userExists) {
        if (err) {
          req.session.flash = {
            type: 'elegant-color blockquote bq-warning',
            message: 'Only characters allowed!'
          }
          return res.redirect('/register')
        }
        if (!/^[a-z0-9]+$/i.test(username)) {
          req.session.flash = {
            type: 'elegant-color blockquote bq-danger',
            message: 'Only letters allowed for username'
          }
          return res.redirect('/register')
        }
        if (userExists) {
          req.session.flash = {
            type: 'elegant-color blockquote bq-warning',
            message: 'Username is already taken'
          }
          res.redirect('/register')
        } else {
          user.save(function (err, data) {
            if (!err) {
              req.session.flash = {
                type: 'default-color-dark blockquote bq-success',
                message: 'Your account has been created'
              }
              return res.redirect('/Login')
            } else if (err.name === 'ValidationError' && err.errors.password) {
              req.session.flash = {
                type: 'elegant-color-dark blockquote bq-danger',
                message: 'Password is required'
              }
              return res.redirect('/Register')
            } else if (err.name === 'ValidationError' && err.errors.username) {
              req.session.flash = {
                type: 'elegant-color-dark blockquote bq-danger',
                message: 'Username is required'
              }
              return res.redirect('/Register')
            }
          })
        }
      })
    })

module.exports = router
