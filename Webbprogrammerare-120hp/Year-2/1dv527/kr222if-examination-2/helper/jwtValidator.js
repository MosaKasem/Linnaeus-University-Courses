const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].replace(/^Bearer\s/, '')
    const decoded = await jwt.verify(token, process.env.SECRET_STRING_JWT)

    req.userInfo = decoded.username

    next()
  } catch (err) {
    res.status(401).json({
      message: 'Authorization failed', status: 401, success: false })
  }
}
