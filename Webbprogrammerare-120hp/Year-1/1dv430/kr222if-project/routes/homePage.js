let router = require('express').Router()

router.route('/')
    .get((req, res) => {
      res.render('homePage')
    })

module.exports = router
