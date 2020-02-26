/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 */

let router = require('express').Router()
let User = require('../model/User')
let jws = require('jsonwebtoken')

/** @default Add-User-To-Database */
router.route('/setUpUser').get(async (req, res) => {
  try {
    let user = new User({
      username: 'NotAdmin',
      password: 'password',
      admin: 'false'
    })
    const newUser = await user.save()
    if (newUser) {
      return res.send('successfully registered user')
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: `Error: User already exists`
    })
  }
})

/**
 * @description homepage
 */
router.route('/').get((req, res, next) => {
  res.json({
    self: {
      href: `https://${req.headers.host}/api/v1`,
      method: 'GET'},

    catch: {
      href: `https://${req.headers.host}/api/v1/catch`,
      method: 'GET'},

    webhook: {
      href: `https://${req.headers.host}/api/v1/webhook`,
      method: 'GET'},

    user: {
      href: `https://${req.headers.host}/api/v1/user`,
      method: 'GET'},

    token: {
      href: `https://${req.headers.host}/api/v1/auth`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'},
      params: {
        username: '{username}',
        password: '{password}'}}
  })
})

 /**
  * @description generates a token when registered user signs in, show the token to user.
  */
router.route('/auth').post((req, res, next) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) {
      res.status(500).json({
        message: 'An error has occured! please try again later',
        method: 'POST',
        status: 500,
        success: false
      })
    }
    if (!user) {
      res.status(401).json({
        message: '401 - no user found',
        method: 'POST',
        status: 401,
        success: false
      })
    } else if (user) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          res.status(500).json({
            message: 'An error has occured',
            method: 'POST',
            status: 500,
            success: false
          })
        } else {
          if (!isMatch) {
            res.status(401).json({
              message: 'Unauthorized access',
              method: 'POST',
              status: 401,
              success: false
            })
          } else {
            let token = jws.sign(user.toJSON(), process.env.SECRET_STRING_JWT, {
              expiresIn: '24h'
            })
            res.status(201).json({
              message: 'Token has been signed',
              your_token: token,
              method: 'POST',
              status: 201,
              success: true,
              nextUri: {'add-catch': `https://${req.headers.host}/api/v1/catch/add`, 'register-webhook': `https://${req.headers.host}/api/v1/webhook/register`}
            })
          }
        }
      })
    }
  })
})

module.exports = router
