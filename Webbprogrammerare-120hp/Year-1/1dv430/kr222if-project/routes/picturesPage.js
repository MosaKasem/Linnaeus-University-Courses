let router = require('express').Router()

router.route('/Billeder')
    .get((req, res) => {
      res.render('picturesPage')
    })

module.exports = router
