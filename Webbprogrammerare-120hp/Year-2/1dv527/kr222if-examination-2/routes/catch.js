/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 */

let router = require('express').Router()
let FishSchema = require('../model/FishList')
let jwtValidator = require('../helper/jwtValidator')
let WebHook = require('../model/Webhook')
let fetch = require('node-fetch')

/**
 * @description the homepage of catch api
 */
router.route('/catch').get((req, res, next) => {
  res.json({
    self: {
      href: `https://${req.headers.host}/api/v1/catch`,
      method: 'GET'},

    getAll: {
      href: `https://${req.headers.host}/api/v1/catch/getAll`,
      method: 'GET'},

    getOne: {
      href: `https://${req.headers.host}/api/v1/catch/getOne/:id`,
      method: 'GET',
      params: {
        id: '{int}'
      }},

    add: {
      href: `https://${req.headers.host}/api/v1/catch/add`,
      method: 'POST',
      headers: {
        keys: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'bearer {token} '}},
      params: {
        body: {
          position: '{int}',
          specie: '{str}',
          weight: '{int}',
          imageUrl: '{str}'
        }}},

    edit: {
      href: `https://${req.headers.host}/api/v1/catch/update/:id`,
      method: 'PUT',
      headers: {
        keys: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'bearer {token} '
        }},
      params: {
        body: {
          position: '{int}',
          specie: '{str}',
          weight: '{int}',
          imageUrl: '{str}'
        }}},

    delete: {href: `https://${req.headers.host}/api/v1/catch/delete/:id`,
      method: 'DELETE',
      headers: {
        keys: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'bearer {token} '
        }},
      params: {}}
  })
})

/**
 * @description returns all data
 */
router.route('/catch/getAll').get(async (req, res, next) => {
  try {
    const fishes = await FishSchema.find({}).select('user position specie weight imageUrl timeStamp _id')
    const resp = fishes.map((data) => {
      return {nextUri: `https://${req.headers.host}/api/v1/catch/getOne/${data._id}`, user: data.user, position: data.position, specie: data.specie, weight: data.weight, imageUrl: data.imageUrl}
    })

    res.status(201).json({
      self: {
        href: `https://${req.headers.host}/api/v1/catch/getAll`,
        method: 'GET',
        status: 201,
        success: true
      },
      response: {resp}
    })
  } catch (err) {
    res.status(500).json({message: 'An error has occured! please try again later',
      method: 'GET',
      status: 500,
      success: false})
  }
})
/**
 * @description returns data by _id
 */
router.route('/catch/getOne/:id').get(async(req, res, next) => {
  try {
    const fish = await FishSchema.find({_id: req.params.id})
    return res.status(200).json({
      self: {
        href: `https://${req.headers.host}/api/v1/catch/getOne/${req.params.id}`,
        method: 'GET',
        status: 200,
        success: true,
        params: {
          id: `${req.params.id}`
        }},
      response: {
        user: fish[0].user,
        position: fish[0].position,
        specie: fish[0].specie,
        weight: fish[0].weight,
        imageUrl: fish[0].imageUrl,
        timeStamp: fish[0].timeStamp,
        id: fish[0]._id
      },
      update: {
        href: `https://${req.headers.host}/api/v1/catch/update/${fish[0]._id}`,
        method: 'PUT',
        headers: {
          keys: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'bearer {token} '}},
        params: {
          body: {
            position: '{int}',
            specie: '{str}',
            weight: '{int}',
            imageUrl: '{str}'
          }}
      },
      delete: {
        href: `https://${req.headers.host}/api/v1/catch/delete/${fish[0]._id}`,
        method: 'DELETE',
        headers: {
          keys: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'bearer {token} '}},
        params: {}
      }
    })
  } catch (error) {
    if (error.message === `Cast to ObjectId failed for value "${req.params.id}" at path "_id" for model "Catch"`) {
      return res.status(404).json({
        message: `No match for the specified ID: ${req.params.id}`,
        method: 'GET',
        status: 404,
        success: false
      })
    }
    return res.status(500).json({
      message: 'An error has occured! please try again later',
      method: 'GET',
      status: 500,
      success: false
    })
  }
})

/**
 * @default Client-Side-Errors- {
 *      400 Bad Request
 *      401 Unauthorized
 *      402 Payment Required
 *      403 Forbidden
 *      404 you know what it is!
 * }
 * @default Server-Side-Errors- {
 *      500 / Unexpected error was encountered, no suitable message
 *      501 / Unrecognized request method
 *      502 / Bad proxy or bad response.
 *      503 / Server unavailable (temporarliy)
 *      504 / Gateway timeout, did not recieve a timely respose
 * }
 */

/**
 * @description register caught fish
 */
router.route('/catch/add').post(jwtValidator, async (req, res, next) => {
  const { position, specie, weight, imageUrl } = req.body

  let fishCaught = new FishSchema({
    user: req.userInfo,
    position,
    specie,
    weight,
    imageUrl
  })
  try {
    const newFish = await fishCaught.save()
    const webhook = await WebHook.find({})

    webhook.map(url => {
      fetch(url.payload, {method: 'POST', body: newFish})
    })

    res.status(201).json({
      message: 'success, your data is saved!',
      self: {href: `https://${req.headers.host}/api/v1/catch/add`,
        status: 201,
        success: true
      },
      nextUri: `https://${req.headers.host}/api/v1/catch/getOne/${newFish._id}`,
      data: {user: req.userInfo, position: position, specie: specie, weight: weight, imageUrl: imageUrl, timeStamp: newFish.timeStamp, id: newFish._id}
    })
  } catch (error) {
    res.status(500).json({message: 'An error has occured! please try again later', method: 'POST', status: 500, success: false})
  }
})
/**
 * @description delete registered capturd fish
 */
router.route('/catch/delete/:id').delete(jwtValidator, async(req, res) => {
  try {
    const fish = await FishSchema.findOneAndRemove({_id: req.params.id})
    res.status(202).json({message: `Successfully deleted ${fish._id}`, method: 'DELETE', status: 202, success: true})
  } catch (error) {
    if (error.message === `Cast to ObjectId failed for value "${req.params.id}" at path "_id" for model "Catch"`) {
      return res.status(404).json({message: `no match for https://${req.headers.host}/api/v1/catch/delete/${req.params.id}`, method: 'DELETE', status: 404, success: false, nextUri: `https://localhost:8080/api/v1/catch/getAll`})
    }
    res.status(500).json({message: 'An error has occured! please try again later', method: 'DELETE', status: 500, success: false})
  }
})

/**
 * @description update a registered capturd fish
 */
router.route('/catch/update/:id').put(jwtValidator, async (req, res) => {
  try {
    await FishSchema.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, new: true, runValidators: true}
    ).exec()

    const updated = await FishSchema.findById({_id: req.params.id})
    res.status(201).json({
      message: 'success, your data is updated!',
      status: 201,
      success: true,
      self: `https://${req.headers.host}/api/v1/catch/add`,
      nextUri: `https://${req.headers.host}/api/v1/catch/getOne/${updated._id}`,
      data: {user: updated.user, position: updated.position, specie: updated.specie, weight: updated.weight, imageUrl: updated.imageUrl, timeStamp: updated.timeStamp}
    })
  } catch (error) {
    if (error.message === `Cast to ObjectId failed for value "${req.params.id}" at path "_id" for model "Catch"`) {
      return res.status(404).json({message: `no match for https://${req.headers.host}/api/v1/catch/update/${req.params.id}`, method: 'PUT', status: 404, success: false, nextUri: `https://localhost:8080/api/v1/catch/getAll`})
    }
    res.status(500).json({message: 'An error has occured! please try again later', status: 500, success: false})
  }
})

module.exports = router
