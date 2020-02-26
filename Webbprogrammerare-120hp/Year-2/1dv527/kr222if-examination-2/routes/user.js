/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 */

let router = require('express').Router()
let User = require('../model/User')
let jwtValidator = require('../helper/jwtValidator')
let WebHook = require('../model/Webhook')

/**
 * @description homepage of user
 */
router.route('/user').get((req, res, next) => {
  res.json({
    self: {href: `https://${req.headers.host}/api/v1/user`, method: 'GET'},
    getAll: {href: `https://${req.headers.host}/api/v1/user/getAllUsers`, method: 'GET'},
    getOne: {href: `https://${req.headers.host}/api/v1/user/getUser/:username`, method: 'GET'}
  })
})
/**
 * @description lists all users
 */
router.route('/user/getAllUsers').get(async(req, res) => {
  try {
    const users = await User.find({})
    const filteredUsers = users.map((user, counter) => {
      return {number: counter, user: `https://${req.headers.host}/api/v1/user/getUser/${user.username}`}
    })
    res.json({
      self: {
        href: `https://${req.headers.host}/api/v1/catch/add`, method: 'GET', status: 200, success: true
      },
      Users: filteredUsers
    })
  } catch (error) {
    res.status(500).json({message: 'An error has occured! please try again later', method: 'GET', status: 500, success: false})
  }
})
/**
 * @description lists a specific user
 * @throws 404 if user not found
 * @link
 */
router.route('/user/getUser/:username').get(async(req, res) => {
  try {
    const user = await User.find({username: req.params.username})
    if (!user || user.length === 0) {
      return res.status(404).json({message: `no match for https://${req.headers.host}/api/v1/user/getUser/${req.params.username}`, method: 'GET', status: 404, success: false, nextUri: `https://localhost:8080/api/v1/user/getAllUsers`})
    }
    res.status(200).json({self: {href: `https://${req.headers.host}/api/v1/user/getUser/${user[0].username}`, method: 'GET', status: 200, success: true}, users: {user: user[0].username}})
  } catch (error) {
    res.status(500).json({message: 'An error has occured! please try again later', method: 'GET', status: 500, success: false})
  }
})

/**
 * @description homepage of webhook
 */
router.route('/webhook').get((req, res, next) => {
  res.json({
    self: {href: `https://${req.headers.host}/api/v1/webhook`,
      method: 'GET'
    },
    register: {
      href: `https://${req.headers.host}/api/v1/webhook/register/`,
      method: 'POST',
      header: {
        keys: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':
               'bearer {token}'
        },
        params: {
          payload: '{url}'
        }}
    }
  })
})

router.route('/webhook/register/').post(jwtValidator, async (req, res) => {
  const webhook = new WebHook({payload: req.body.payload})
  try {
    const hook = await webhook.save()
    if (hook) {
      res.status(201).json({message: `webhook registered! ${req.body.payload}`, self: {href: `https://${req.headers.host}/api/v1/webhook/register/`, method: 'POST', status: 201}})
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({'duplicated-url': req.body.payload, self: {href: `https://${req.headers.host}/api/v1/webhook/register`, method: 'GET', status: 400, success: false}})
    }
    if (error.errors.payload) {
      return res.status(400).json({'invalid-url': req.body.payload, self: {href: `https://${req.headers.host}/api/v1/webhook/register`, method: 'GET', status: 400, success: false}})
    }

    res.status(500).json({message: 'An error has occured! please try again later', self: `https://${req.headers.host}//api/v1/webhooks/register`, method: 'POST', status: 500, success: false})
  }
})

module.exports = router
