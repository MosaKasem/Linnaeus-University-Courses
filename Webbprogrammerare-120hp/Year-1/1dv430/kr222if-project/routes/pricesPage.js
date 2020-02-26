let router = require('express').Router()

router.route('/Prices')
    .get((req, res) => {
      res.render('pricesPage')
    })

module.exports = router
