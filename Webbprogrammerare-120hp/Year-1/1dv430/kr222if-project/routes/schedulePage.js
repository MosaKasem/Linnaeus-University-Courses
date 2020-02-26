let router = require('express').Router()
let Schedule = require('../models/Schedule')

router.route('/Schedule')
  .get(authorize, async (req, res, next) => {
    const alreadyBooked = await new Promise((resolve, reject) => {
      Schedule.find({user: req.session.user}, (err, data) => {
        return err ? reject(err) : resolve(data)
      })
    })
    const alreadyTake = alreadyBooked.map(booked => booked.id)
    let currentDay = new Date()
    Schedule.find({}, function (err, booked) {
      if (!err) {
        let context = {
          booked: booked.map(function (booked) {
            if (booked.createdAt.getDay() !== currentDay.getDay()) {
              Schedule.findOneAndRemove({}, (err, data) => {
                if (!err) {
                  req.session.flash = {
                    type: 'elegant-color blockquote bq-warning',
                    message: `Something went wrong, Try Again Later`
                  }
                } else {
                  req.session.flash = {
                    type: 'elegant-color blockquote bq-warning',
                    message: 'Something Went Wrong!'
                  }
                }
              })
              // res.redirect('/')
            }
            return {
              user: booked.user,
              time: booked.time,
              id: booked._id,
              bookedTime: alreadyTake.includes(booked.id),
              todaysDate: booked.createdAt.toISOString().slice(0, 10)
            }
          })
        }

        res.render('schedulePage', context)
      } else {
        req.session.flash = {
          type: 'elegant-color blockquote bq-warning',
          message: `Something went wrong, Please reload the page`
        }
        res.render('schedulePage')
      }
    })
  })
  .post(function (req, res, next) {
    let form = req.body.timeSch
    let currentUser = req.session.user

    Math.round(form)
    let schedule = new Schedule({
      user: currentUser,
      time: req.sanitize(Math.round(form))
    })
    Schedule.find({}, function (err, data) {
      if (!err) {
        schedule.save(function (err, data) {
          if (!err) {
            req.session.flash = {
              type: 'elegant-color blockquote bq-success',
              message: `${req.session.user} You have been booked at ${schedule.time}`
            }
            res.redirect('/schedule')
          } else if (err) {
            if (err.name === 'BulkWriteError') {
              req.session.flash = {
                type: 'elegant-color blockquote bq-danger',
                message: `Det er allerede reserveret`
              }
              res.redirect('/schedule')
            }
          }
        })
      } else if (err) {
        next(err)
      }
    }).catch((err) => console.log(err))
  })

// if mongoDB fails without errors. use this.
// process.on('unhandledRejection', function (reason, promise) {
//   console.log(reason)
//   console.log(promise)
// })

router.post('/delete/:id', function (req, res) {
  Schedule.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) {
      req.session.flash = {
        type: 'elegant-color blockquote bq-danger',
        message: `Not Authorized ${err}`
      }
      res.redirect('/schedule')
    } else if (data) {
      req.session.flash = {
        type: 'elegant-color blockquote bq-danger',
        message: `Successfully Deleted`
      }
      res.redirect('/schedule')
    }
  })
})

function authorize (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.session.flash = {
      type: 'elegant-color blockquote bq-warning',
      message: `Not Authorized! `
    }
    res.redirect('/')
  }
}

module.exports = router
