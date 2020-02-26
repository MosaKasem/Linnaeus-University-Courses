'use strict'

exports.validateOrigin = (req, res) => {
    if(process.env.HASH_SECRET === req.headers['x-auth-user']) {
        next()
    } else {
        throw Error('Not valid origin.')
    }
    res.setStatus(200)
}